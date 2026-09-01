'use client';

import { useState } from 'react';

const layers = [
  { n: 7, name: 'Application', pdu: 'Data', job: 'Provides network services to user-facing applications.', examples: 'HTTP, HTTPS, DNS, SMTP, SSH', sits: 'Browser, API client, web server, mail server, resolver', risks: 'Injection, authentication failure, API abuse, malicious content', telemetry: 'Application logs, API gateway, DNS logs, web proxy, WAF', controls: 'Strong authentication, authorization, validation, secure protocols' },
  { n: 6, name: 'Presentation', pdu: 'Data', job: 'Represents, transforms, compresses and encrypts data so systems interpret it consistently.', examples: 'TLS encoding, JSON, XML, UTF-8, JPEG', sits: 'Application libraries, serializers, cryptographic libraries', risks: 'Unsafe parsing, downgrade, weak cryptography, deserialization', telemetry: 'TLS handshake details, parser errors, certificate logs', controls: 'Safe formats, modern TLS, strict parsers, certificate validation' },
  { n: 5, name: 'Session', pdu: 'Data', job: 'Establishes, maintains and ends a logical conversation between applications.', examples: 'Session tokens, RPC sessions, NetBIOS session service', sits: 'Application session manager, identity provider, gateway', risks: 'Session fixation, token theft, replay, weak timeout', telemetry: 'Login and logout events, token issue and refresh, session duration', controls: 'Secure cookies, rotation, timeout, reauthentication, token binding' },
  { n: 4, name: 'Transport', pdu: 'Segment or datagram', job: 'Moves application data between endpoints with ports, reliability, flow and congestion behavior.', examples: 'TCP, UDP, QUIC', sits: 'Operating-system network stack, load balancer, firewall', risks: 'Port abuse, connection exhaustion, reset or handshake manipulation', telemetry: 'Source and destination ports, flags, retransmits, connection state', controls: 'Stateful firewall, rate limit, load balancing, protected transport' },
  { n: 3, name: 'Network', pdu: 'Packet', job: 'Addresses and routes traffic across different networks.', examples: 'IPv4, IPv6, ICMP, IPsec, routing protocols', sits: 'Router, Layer 3 switch, firewall, cloud route table', risks: 'Route abuse, spoofing, exposed paths, denial of service', telemetry: 'NetFlow, route changes, IP metadata, firewall logs', controls: 'Routing policy, network segmentation, anti-spoofing, IPsec' },
  { n: 2, name: 'Data Link', pdu: 'Frame', job: 'Moves frames on one local network and identifies local interfaces.', examples: 'Ethernet, Wi-Fi, ARP, VLAN, MAC addresses', sits: 'Switch, wireless access point, network interface', risks: 'ARP spoofing, rogue access point, VLAN hopping, MAC flooding', telemetry: 'Switch tables, ARP changes, wireless events, VLAN flows', controls: '802.1X, switch security, protected Wi-Fi, VLAN design' },
  { n: 1, name: 'Physical', pdu: 'Bits', job: 'Carries electrical, optical or radio signals through the medium.', examples: 'Copper, fiber, radio, connectors, transceivers', sits: 'Cable, antenna, patch panel, repeater, network port', risks: 'Tapping, jamming, cable damage, unauthorized device connection', telemetry: 'Link state, signal strength, interface errors, physical alarms', controls: 'Locked facilities, protected cabling, port control, resilient paths' },
];

export default function OsiModelExplorer() {
  const [selected, setSelected] = useState(7);
  const layer = layers.find((item) => item.n === selected) ?? layers[0];
  return <section className="osi-explorer" id="osi-model">
    <header><span>Open Systems Interconnection model</span><h2>OSI is a troubleshooting map, not a literal packet factory.</h2><p>The seven-layer model separates communication responsibilities. Real protocols often cross layer boundaries, but the model helps you ask where a failure, control or observation belongs.</p></header>
    <div className="osi-layout">
      <div className="osi-stack" role="tablist" aria-label="OSI layers">{layers.map((item) => <button className={selected === item.n ? 'active' : ''} onClick={() => setSelected(item.n)} role="tab" aria-selected={selected === item.n} type="button" key={item.n}><span>L{item.n}</span><strong>{item.name}</strong><small>{item.examples}</small></button>)}</div>
      <article className="osi-detail" role="tabpanel">
        <header><span>Layer {layer.n}</span><h3>{layer.name}</h3><b>Protocol Data Unit: {layer.pdu}</b></header>
        <p>{layer.job}</p>
        <div><section><span>Common protocols and formats</span><p>{layer.examples}</p></section><section><span>Where it sits</span><p>{layer.sits}</p></section><section><span>Failure and attack examples</span><p>{layer.risks}</p></section><section><span>Telemetry</span><p>{layer.telemetry}</p></section><section><span>Controls</span><p>{layer.controls}</p></section></div>
      </article>
    </div>
    <div className="osi-encapsulation"><span>Encapsulation</span>{['Application data', 'TCP segment or UDP datagram', 'IP packet', 'Ethernet or Wi-Fi frame', 'Bits on a medium'].map((item, index) => <div key={item}><b>{item}</b>{index < 4 && <i>→</i>}</div>)}</div>
    <div className="tcp-ip-map"><span>OSI to TCP/IP</span><div><b>Application</b><small>OSI 7, 6, 5</small></div><div><b>Transport</b><small>OSI 4</small></div><div><b>Internet</b><small>OSI 3</small></div><div><b>Link</b><small>OSI 2, 1</small></div></div>
    <details><summary>Walk one HTTPS request from Layer 7 to Layer 1 <i>＋</i></summary><ol><li>The browser creates an HTTP request and resolves the server name using DNS.</li><li>Transport establishes a TCP connection or QUIC session using ports and reliability behavior.</li><li>The network layer places source and destination IP addresses around the transport data and selects a route.</li><li>The local data-link layer frames the packet for Ethernet or Wi-Fi and uses a local next-hop address.</li><li>The physical layer carries bits as electrical, optical or radio signals.</li><li>At each hop, the local frame changes. The routed IP packet continues toward the destination, subject to routing, filtering and translation.</li><li>The server reverses encapsulation, validates the secure session and passes the request to the application.</li></ol></details>
  </section>;
}

