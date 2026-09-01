'use client';

import { useMemo, useState } from 'react';

type PermissionSet = { read: boolean; write: boolean; execute: boolean };
type SpecialBit = 0 | 1 | 2 | 4;

const emptySet = (): PermissionSet => ({ read: false, write: false, execute: false });
const presets = [
  { label: '644', note: 'Public file', owner: 6, group: 4, others: 4, special: 0 as SpecialBit },
  { label: '640', note: 'Private configuration', owner: 6, group: 4, others: 0, special: 0 as SpecialBit },
  { label: '755', note: 'Public directory or program', owner: 7, group: 5, others: 5, special: 0 as SpecialBit },
  { label: '750', note: 'Team directory', owner: 7, group: 5, others: 0, special: 0 as SpecialBit },
  { label: '700', note: 'Owner-only directory', owner: 7, group: 0, others: 0, special: 0 as SpecialBit },
  { label: '600', note: 'Private key or file', owner: 6, group: 0, others: 0, special: 0 as SpecialBit },
  { label: '1777', note: 'Shared temporary directory', owner: 7, group: 7, others: 7, special: 1 as SpecialBit },
  { label: '2770', note: 'Group-inheriting shared directory', owner: 7, group: 7, others: 0, special: 2 as SpecialBit },
];

function setFromDigit(value: number): PermissionSet {
  return { read: Boolean(value & 4), write: Boolean(value & 2), execute: Boolean(value & 1) };
}

function digitFromSet(value: PermissionSet) {
  return (value.read ? 4 : 0) + (value.write ? 2 : 0) + (value.execute ? 1 : 0);
}

export default function LinuxPermissionsLab() {
  const [owner, setOwner] = useState<PermissionSet>(setFromDigit(6));
  const [group, setGroup] = useState<PermissionSet>(setFromDigit(4));
  const [others, setOthers] = useState<PermissionSet>(setFromDigit(4));
  const [special, setSpecial] = useState<SpecialBit>(0);

  const result = useMemo(() => {
    const digits = [digitFromSet(owner), digitFromSet(group), digitFromSet(others)];
    const chars = [owner, group, others].flatMap((set) => [set.read ? 'r' : '-', set.write ? 'w' : '-', set.execute ? 'x' : '-']);
    if (special & 4) chars[2] = owner.execute ? 's' : 'S';
    if (special & 2) chars[5] = group.execute ? 's' : 'S';
    if (special & 1) chars[8] = others.execute ? 't' : 'T';
    return { octal: `${special ? special : ''}${digits.join('')}`, symbolic: chars.join(''), digits };
  }, [owner, group, others, special]);

  function update(target: 'owner' | 'group' | 'others', permission: keyof PermissionSet) {
    const setters = { owner: setOwner, group: setGroup, others: setOthers };
    setters[target]((current) => ({ ...current, [permission]: !current[permission] }));
  }

  function applyPreset(preset: (typeof presets)[number]) {
    setOwner(setFromDigit(preset.owner));
    setGroup(setFromDigit(preset.group));
    setOthers(setFromDigit(preset.others));
    setSpecial(preset.special);
  }

  function clear() {
    setOwner(emptySet());
    setGroup(emptySet());
    setOthers(emptySet());
    setSpecial(0);
  }

  const groups = [
    { id: 'owner' as const, label: 'Owner', value: owner },
    { id: 'group' as const, label: 'Group', value: group },
    { id: 'others' as const, label: 'Others', value: others },
  ];

  return <div className="permission-lab">
    <header><div><span>Interactive Linux lab</span><h3>Build a permission, then read it three ways.</h3></div><button onClick={clear} type="button">Clear</button></header>
    <div className="permission-presets">{presets.map((preset) => <button className={result.octal === preset.label ? 'active' : ''} onClick={() => applyPreset(preset)} type="button" key={preset.label}><strong>{preset.label}</strong><span>{preset.note}</span></button>)}</div>
    <div className="permission-builder">
      {groups.map((entry) => <section key={entry.id}><header><span>{entry.label}</span><b>{digitFromSet(entry.value)}</b></header><div>{(['read', 'write', 'execute'] as const).map((permission) => <label key={permission}><input checked={entry.value[permission]} onChange={() => update(entry.id, permission)} type="checkbox" /><span>{permission === 'read' ? 'r' : permission === 'write' ? 'w' : 'x'}</span><small>{permission}<b>{permission === 'read' ? '4' : permission === 'write' ? '2' : '1'}</b></small></label>)}</div></section>)}
      <section className="special-bits"><header><span>Special bit</span><b>{special}</b></header><div><label><input checked={special === 0} onChange={() => setSpecial(0)} type="radio" name="special" /><span>0</span><small>None</small></label><label><input checked={special === 1} onChange={() => setSpecial(1)} type="radio" name="special" /><span>1</span><small>Sticky</small></label><label><input checked={special === 2} onChange={() => setSpecial(2)} type="radio" name="special" /><span>2</span><small>setgid</small></label><label><input checked={special === 4} onChange={() => setSpecial(4)} type="radio" name="special" /><span>4</span><small>setuid</small></label></div></section>
    </div>
    <div className="permission-result"><div><span>Octal</span><strong>{result.octal}</strong><small>{result.digits.join(' · ')}</small></div><div><span>Symbolic</span><strong>{result.symbolic}</strong><small>owner · group · others</small></div><div><span>Command</span><code>chmod {result.octal} path</code><small>Run only after checking the target and intended access.</small></div></div>
    <p className="permission-warning"><b>Why 777 is not the goal</b> It gives read, write and execute to owner, group and everyone else. The highest number is not the strongest security. Start from who actually needs each capability.</p>
  </div>;
}
