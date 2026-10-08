import type { PortfolioData } from '../types';

export const fallbackPortfolioData: PortfolioData = {
  profile: {
    id: 'profile-1',
    name: 'Abrar Shah',
    displayName: 'Abrar Shah',
    brandName: 'EXPORTON NETWORKS',
    title: 'Computer Science Student & Networking Enthusiast',
    headline: 'BS Computer Science student passionate about computer networking, network infrastructure, troubleshooting, automation and modern IT technologies.',
    shortBio: 'Enthusiastic Computer Science undergraduate at AWKUM with an outstanding 3.87 CGPA, dedicated to mastering enterprise computer networking, routing protocols, switching, and network automation.',
    fullBio: 'I am Abrar Shah, a Computer Science student at Abdul Wali Khan University Mardan (AWKUM) maintaining a 3.87 CGPA. Under the professional banner of EXPORTON NETWORKS, I focus on network infrastructure engineering, packet analysis, Cisco and Huawei networking paradigms, and modern automation. With a solid foundation spanning FSc Pre-Medical (A1 Grade, 918/1100), Matric Science (Grade A, 868/1100), and a Diploma in Information Technology (DIT, Grade A, 753), my ambition is to build scalable, resilient corporate and campus network architectures.',
    location: 'Village Babuzai, Tehsil Katlang, District Mardan, Khyber Pakhtunkhwa, Pakistan',
    email: 'abrarshah2134896@gmail.com',
    phone: '+92 310 1905776',
    whatsapp: '+92 310 1905776',
    avatarUrl: '/abrar-shah.jpg',
    resumeUrl: '',
    statusTagline: 'Open for Network Engineering Internships & Collaborative IT Projects',
    primaryGoal: 'Build an impactful career in network engineering, enterprise infrastructure, network automation, and IT solutions.',
    drivingLicense: 'Motor Car Driving with LTV License (2 Years Experience)',
    interests: [
      'Computer Networking',
      'Technical Reading',
      'Vlog & Video Creation',
      'Traveling',
      'Infrastructure Automation'
    ],
    cgpa: '3.87',
    updatedAt: new Date().toISOString()
  },
  education: [
    {
      id: 'edu-1',
      degree: 'BS Computer Science',
      institution: 'Abdul Wali Khan University Mardan (AWKUM)',
      fieldOfStudy: 'Computer Science & Networking',
      cgpa: '3.87',
      startYear: '2023',
      endYear: '2027',
      isCurrent: true,
      description: 'Undergraduate studies emphasizing Data Communication, Computer Networks, Operating Systems, Algorithms, and System Architecture.',
      order: 1
    },
    {
      id: 'edu-2',
      degree: 'Diploma in Information Technology (DIT)',
      institution: 'Khyber Pakhtunkhwa Board of Technical Education',
      fieldOfStudy: 'Information Technology & Applied Computing',
      marks: '753',
      grade: 'Grade A',
      startYear: '2023',
      endYear: '2024',
      isCurrent: false,
      description: 'Comprehensive technical diploma covering computer hardware, networking basics, office suites, and database fundamentals.',
      order: 2
    },
    {
      id: 'edu-3',
      degree: 'FSc Pre-Medical',
      institution: 'Essar College of Sciences Katlang',
      fieldOfStudy: 'Pre-Medical Sciences',
      marks: '918',
      totalMarks: '1100',
      grade: 'Grade A1',
      startYear: '2021',
      endYear: '2023',
      isCurrent: false,
      description: 'Rigorous foundation in biological sciences, physics, chemistry, analytical reasoning, and scientific methodology.',
      order: 3
    },
    {
      id: 'edu-4',
      degree: 'Matriculation (Science)',
      institution: 'BISE Mardan',
      fieldOfStudy: 'Science Group',
      marks: '868',
      totalMarks: '1100',
      grade: 'Grade A',
      startYear: '2019',
      endYear: '2021',
      isCurrent: false,
      description: 'Secondary school certificate with high distinction in core sciences, mathematics, and computing fundamentals.',
      order: 4
    }
  ],
  experience: [
    {
      id: 'exp-1',
      jobTitle: 'Network Engineering & Simulation Practitioner',
      company: 'Exporton Networks Lab',
      location: 'Mardan, Pakistan',
      startDate: '2023',
      endDate: 'Present',
      isCurrent: true,
      description: 'Configuring enterprise network topologies, implementing dynamic routing (OSPF, RIP, EIGRP concepts), setting up multi-switch VLAN segmentation, 802.1Q trunking, STP loop prevention, and access-control security policies in Cisco Packet Tracer and GNS3.',
      skills: ['Cisco Packet Tracer', 'GNS3', 'VLAN 802.1Q', 'OSPF', 'Network Troubleshooting'],
      order: 1
    },
    {
      id: 'exp-2',
      jobTitle: 'Motor Vehicle Driver (LTV Licensed)',
      company: 'Field & Transportation Mobility',
      location: 'Khyber Pakhtunkhwa, Pakistan',
      startDate: '2022',
      endDate: 'Present',
      isCurrent: true,
      description: 'Over 2 years of active, licensed driving experience holding an official LTV license. Reliable mobility for on-site IT deployments, field troubleshooting, equipment transport, and campus network maintenance.',
      skills: ['LTV Driving License', 'Field Mobility', 'Logistics Management', 'Hardware Transport'],
      order: 2
    }
  ],
  skills: [
    { id: 'sk-1', name: 'Computer Networking', category: 'Networking', proficiency: 92, isFeatured: true, order: 1 },
    { id: 'sk-2', name: 'Network Troubleshooting', category: 'Networking', proficiency: 90, isFeatured: true, order: 2 },
    { id: 'sk-3', name: 'VLAN (Virtual LAN) & 802.1Q', category: 'Networking', proficiency: 88, isFeatured: true, order: 3 },
    { id: 'sk-4', name: 'STP (Spanning Tree Protocol)', category: 'Networking', proficiency: 84, isFeatured: true, order: 4 },
    { id: 'sk-5', name: 'OSPF Dynamic Routing', category: 'Networking', proficiency: 87, isFeatured: true, order: 5 },
    { id: 'sk-6', name: 'ACL (Access Control Lists)', category: 'Networking', proficiency: 85, isFeatured: true, order: 6 },
    { id: 'sk-7', name: 'NAT / PAT', category: 'Networking', proficiency: 86, isFeatured: true, order: 7 },
    { id: 'sk-8', name: 'DHCP & DNS Architecture', category: 'Networking', proficiency: 89, isFeatured: true, order: 8 },
    { id: 'sk-9', name: 'VPN Technologies', category: 'Networking', proficiency: 80, isFeatured: true, order: 9 },
    { id: 'sk-10', name: 'Network Monitoring & Telemetry', category: 'Networking', proficiency: 82, isFeatured: true, order: 10 },
    { id: 'sk-11', name: 'Network Automation (Python / Netmiko)', category: 'Networking', proficiency: 81, isFeatured: true, order: 11 },
    { id: 'sk-12', name: 'CCNA Knowledge Track', category: 'Networking', proficiency: 88, isFeatured: true, order: 12 },
    { id: 'sk-13', name: 'CCNP Learning Path', category: 'Networking', proficiency: 75, isFeatured: true, order: 13 },
    { id: 'sk-14', name: 'Huawei Networking Learning', category: 'Networking', proficiency: 72, isFeatured: true, order: 14 },
    { id: 'sk-15', name: 'Python Scripting', category: 'Programming', proficiency: 80, isFeatured: true, order: 15 },
    { id: 'sk-16', name: 'HTML5 & CSS3', category: 'Programming', proficiency: 90, isFeatured: false, order: 16 },
    { id: 'sk-17', name: 'JavaScript & TypeScript', category: 'Programming', proficiency: 82, isFeatured: false, order: 17 },
    { id: 'sk-18', name: 'React SPA Development', category: 'Programming', proficiency: 83, isFeatured: false, order: 18 },
    { id: 'sk-19', name: 'Node.js & Express REST APIs', category: 'Programming', proficiency: 80, isFeatured: false, order: 19 },
    { id: 'sk-20', name: 'Cisco Packet Tracer', category: 'Tools', proficiency: 95, isFeatured: true, order: 20 },
    { id: 'sk-21', name: 'GNS3 Network Simulator', category: 'Tools', proficiency: 84, isFeatured: true, order: 21 },
    { id: 'sk-22', name: 'Git & GitHub Version Control', category: 'Tools', proficiency: 85, isFeatured: false, order: 22 },
    { id: 'sk-23', name: 'VS Code & Linux Environment', category: 'Tools', proficiency: 88, isFeatured: false, order: 23 },
    { id: 'sk-24', name: 'Microsoft Office (Word, Excel, PowerPoint)', category: 'Office', proficiency: 94, isFeatured: false, order: 24 },
    { id: 'sk-25', name: 'Adobe Photoshop', category: 'Design', proficiency: 78, isFeatured: false, order: 25 },
    { id: 'sk-26', name: 'AutoCAD Basics', category: 'Design', proficiency: 74, isFeatured: false, order: 26 },
    { id: 'sk-27', name: 'LTV Driving & Field Transit', category: 'Tools', proficiency: 95, isFeatured: true, order: 27 }
  ],
  services: [
    {
      id: 'srv-1',
      title: 'Enterprise Network Configuration',
      slug: 'network-configuration',
      iconName: 'Network',
      shortDescription: 'End-to-end setup of switches, routers, VLAN segmentation, inter-VLAN routing, and trunking protocols for corporate and educational networks.',
      fullDescription: 'Comprehensive network provisioning including interface addressing, OSPF dynamic routing, NAT/PAT firewalling, and 802.1Q trunking to optimize traffic flow.',
      features: ['Router and switch initialization', 'VLAN design and Inter-VLAN routing', 'OSPF multi-area protocol configuration', 'DHCP server and relay setups'],
      isActive: true,
      order: 1
    },
    {
      id: 'srv-2',
      title: 'Network Troubleshooting & Diagnostics',
      slug: 'network-troubleshooting',
      iconName: 'Activity',
      shortDescription: 'In-depth packet analysis, connectivity restoration, routing loop mitigation, and bottleneck isolation across complex topologies.',
      fullDescription: 'Structured debugging of Layer 1 to Layer 4 issues, fixing spanning-tree loops, resolving duplicate IP addresses, correcting wildcard mask bugs, and packet inspection.',
      features: ['Ping, Traceroute, and ARP diagnosis', 'Spanning-Tree Protocol loop resolution', 'Access list rule debugging', 'MTU and interface flapping fixes'],
      isActive: true,
      order: 2
    },
    {
      id: 'srv-3',
      title: 'Network Telemetry & Monitoring',
      slug: 'network-monitoring',
      iconName: 'Server',
      shortDescription: 'Deployment of real-time monitoring tools, bandwidth utilization tracking, SNMP telemetry, and instant outage alerting.',
      fullDescription: 'Configuration of centralized monitoring platforms, SNMP polling, automated health dashboards, and alert triggers.',
      features: ['SNMP agent setup and MIB tracking', 'Traffic flow analysis and bandwidth logs', 'Automated link-down notifications', 'Uptime and latency metrics dashboards'],
      isActive: true,
      order: 3
    },
    {
      id: 'srv-4',
      title: 'Computer & IT Infrastructure Support',
      slug: 'it-infrastructure-support',
      iconName: 'Wrench',
      shortDescription: 'Reliable hardware assembly, operating system setup, printer/peripheral networking, and preventive IT maintenance for offices and computer labs.',
      fullDescription: 'Physical hardware installation, structured cabling verification, workstation cloning, driver updates, and maintenance.',
      features: ['Workstation and OS installations', 'Network printer and file share setups', 'Preventive hardware maintenance', 'On-site field troubleshooting support (LTV Mobile)'],
      isActive: true,
      order: 4
    },
    {
      id: 'srv-5',
      title: 'Modern Web & Portfolio Development',
      slug: 'web-development',
      iconName: 'Globe',
      shortDescription: 'Clean, responsive web development for technology brands, engineering showcases, and professional personal portfolios.',
      fullDescription: 'Building high-performance websites with React, TypeScript, and modern CSS frameworks.',
      features: ['Responsive UI across all mobile devices', 'Fast static or full-stack architecture', 'Accessible dark and light modes', 'Search Engine Optimization (SEO)'],
      isActive: true,
      order: 5
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Automated Network Device Configuration & Monitoring',
      slug: 'automated-network-config-monitoring',
      category: 'Networking & Automation',
      shortDescription: 'Hands-on lab project automating Cisco multi-device configuration provisioning, backup verification, and telemetry alerting.',
      fullDescription: 'A practical networking automation lab designed to streamline router and switch deployment across enterprise topologies. Leverages Python scripts with Netmiko to push standardized ACL, VLAN, and OSPF configurations, collects running configuration backups, and hooks into LibreNMS/Grafana for live interface monitoring. Integrated with a Telegram bot for real-time link-down notifications.',
      imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80'
      ],
      technologies: ['Python', 'Netmiko', 'Ansible', 'GNS3', 'LibreNMS', 'Grafana', 'InfluxDB', 'Telegram Bot API'],
      githubUrl: '',
      liveUrl: '',
      features: [
        'Batch provisioning of VLAN and OSPF configs across multiple virtual routers in GNS3',
        'Automated running-config snapshot backup to centralized archive',
        'SNMP telemetry metrics visualized in Grafana dashboards',
        'Telegram bot notification dispatch upon simulated link failure'
      ],
      status: 'Learning Project',
      isFeatured: true,
      startDate: '2024-03',
      endDate: 'Present',
      order: 1
    },
    {
      id: 'proj-2',
      title: 'Enterprise Multi-VLAN Campus Network Simulation',
      slug: 'enterprise-multi-vlan-campus-network',
      category: 'Networking',
      shortDescription: 'Hierarchical 3-tier campus network topology simulation with redundancy, Inter-VLAN routing, and ACL security.',
      fullDescription: 'Simulated campus network built in Cisco Packet Tracer and GNS3 consisting of Core, Distribution, and Access layers. Configured with Rapid-PVST+ for loop mitigation, HSRP for gateway redundancy, DHCP snooping, and strict extended ACLs partitioning student, faculty, and administration subnets.',
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80'
      ],
      technologies: ['Cisco Packet Tracer', 'GNS3', 'VLAN 802.1Q', 'OSPFv2', 'Rapid-PVST+', 'HSRP', 'Extended ACL'],
      githubUrl: '',
      liveUrl: '',
      features: [
        '3-tier hierarchical Core-Distribution-Access network topology',
        'Subnet segmentation with Inter-VLAN routing via Layer 3 switch',
        'Gateway redundancy achieved via HSRP failover tests',
        'Hardened port security and DHCP snooping against rogue servers'
      ],
      status: 'Completed',
      isFeatured: true,
      startDate: '2023-10',
      endDate: '2024-01',
      order: 2
    },
    {
      id: 'proj-3',
      title: 'Exporton Networks Modern Portfolio Platform',
      slug: 'exporton-networks-portfolio-platform',
      category: 'Web Development',
      shortDescription: 'Production-ready full-stack portfolio & CMS with typed REST APIs, real media uploads, and granular admin control.',
      fullDescription: 'The current production portfolio platform built from the ground up for Abrar Shah under the Exporton Networks brand. Includes a lightning-fast responsive public web portal, full administrative CRUD dashboard, secure password-hashed authentication, dark/light theme toggle, SEO metadata, and print-ready A4 resume generation.',
      imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80'
      ],
      technologies: ['React 19', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS 4', 'REST API', 'Zod', 'Multer'],
      githubUrl: '',
      liveUrl: '',
      features: [
        'Complete public interface with real-time database reactivity',
        'Protected Admin CMS dashboard with full CRUD for all models',
        'Media upload manager with file validation and preview',
        'A4 Print-optimized resume layout with download triggers'
      ],
      status: 'Completed',
      isFeatured: true,
      startDate: '2024-05',
      endDate: 'Present',
      order: 3
    }
  ],
  certificates: [
    {
      id: 'cert-1',
      title: 'Diploma in Information Technology (DIT)',
      issuingOrg: 'Khyber Pakhtunkhwa Board of Technical Education (KPBTE)',
      issueDate: '2024',
      credentialId: 'DIT-2024-753',
      credentialUrl: '',
      imageUrl: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=800&q=80',
      description: 'One-year comprehensive technical diploma awarded with Grade A (753 Marks). Validates practical skills in IT infrastructure, operating systems, hardware assembly, network basics, and software tools.',
      order: 1
    },
    {
      id: 'cert-2',
      title: 'Motor Car / Light Transport Vehicle (LTV) Driving License',
      issuingOrg: 'Government Licensing Authority, Khyber Pakhtunkhwa',
      issueDate: '2022',
      credentialId: 'LTV-KP-LIC-2022',
      credentialUrl: '',
      imageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
      description: 'Official motor car driving qualification with more than 2 years of active road experience. Affirms personal reliability, logistical readiness, and field mobility for on-site infrastructure dispatches.',
      order: 2
    }
  ],
  blogPosts: [
    {
      id: 'post-1',
      title: 'Deep Dive: Configuring OSPF Single-Area & Multi-Area Routing in Cisco Packet Tracer',
      slug: 'deep-dive-ospf-single-multi-area-packet-tracer',
      excerpt: 'Step-by-step architectural breakdown of Open Shortest Path First (OSPF) link-state routing protocol configuration, DR/BDR election, and metric calculations.',
      content: `## Introduction to OSPF

Open Shortest Path First (OSPF) is one of the most widely deployed Interior Gateway Protocols (IGP) in enterprise networks today. Based on the Dijkstra Shortest Path First algorithm, OSPF offers rapid convergence, hierarchical scalability, and loop-free routing.

### Key Concepts
1. **Link-State Advertisements (LSAs)**: Routers broadcast topological state rather than distance vectors.
2. **DR/BDR Election**: On broadcast multi-access segments, Designated Routers minimize adjacency overhead.
3. **Area 0 (Backbone)**: In multi-area topologies, all non-backbone areas must connect to Area 0 to prevent routing loops.

\`\`\`bash
Router(config)# router ospf 1
Router(config-router)# router-id 1.1.1.1
Router(config-router)# network 192.168.10.0 0.0.0.255 area 0
\`\`\`

### Practical Tips for Lab Setup
- Always use explicit \`router-id\` declarations to prevent election instability when loopbacks flap.
- Verify MTU sizes across adjacent links — MTU mismatches will stick neighbor states in EXSTART/EXCHANGE!`,
      coverImageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
      category: 'Networking',
      tags: ['OSPF', 'Routing', 'Cisco', 'CCNA'],
      isPublished: true,
      isFeatured: true,
      publishedAt: '2024-06-15T10:00:00.000Z',
      readTimeMinutes: 5,
      author: 'Abrar Shah',
      views: 142
    },
    {
      id: 'post-2',
      title: 'The Power of Python and Netmiko for Network Automation',
      slug: 'python-netmiko-network-automation',
      excerpt: 'How to replace manual SSH terminal sessions with automated configuration loops that cut human error to zero.',
      content: `## Why Automate Network Infrastructure?
Manual CLI configuration of dozens of network switches is repetitive, prone to typos, and impossible to audit efficiently. With Python's \`netmiko\` library, we can execute multi-device batch configuration safely in seconds.

### Setting Up a Connection Handler
\`\`\`python
from netmiko import ConnectHandler

cisco_device = {
    'device_type': 'cisco_ios',
    'host': '192.168.1.1',
    'username': 'admin',
    'password': 'SecretPassword123',
}

net_connect = ConnectHandler(**cisco_device)
output = net_connect.send_command('show ip int brief')
print(output)
net_connect.disconnect()
\`\`\`

### Real-World Benefits
- **Zero human typos** in critical ACLs or route statements.
- **Consistent configuration state** enforced across every distribution switch.`,
      coverImageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      category: 'Network Automation',
      tags: ['Python', 'Netmiko', 'Automation', 'DevNet'],
      isPublished: true,
      isFeatured: false,
      publishedAt: '2024-08-20T14:30:00.000Z',
      readTimeMinutes: 4,
      author: 'Abrar Shah',
      views: 98
    }
  ],
  testimonials: [],
  socialLinks: [
    {
      id: 'soc-1',
      platform: 'GitHub',
      label: 'GitHub',
      url: 'https://github.com',
      iconName: 'Github',
      isActive: true,
      order: 1
    },
    {
      id: 'soc-2',
      platform: 'LinkedIn',
      label: 'LinkedIn',
      url: 'https://linkedin.com',
      iconName: 'Linkedin',
      isActive: true,
      order: 2
    },
    {
      id: 'soc-3',
      platform: 'Email',
      label: 'Email',
      url: 'mailto:abrarshah2134896@gmail.com',
      iconName: 'Mail',
      isActive: true,
      order: 3
    },
    {
      id: 'soc-4',
      platform: 'WhatsApp',
      label: 'WhatsApp',
      url: 'https://wa.me/923101905776',
      iconName: 'MessageSquare',
      isActive: true,
      order: 4
    },
    {
      id: 'soc-5',
      platform: 'Facebook',
      label: 'Facebook',
      url: 'https://www.facebook.com/abrarshah',
      iconName: 'Facebook',
      isActive: true,
      order: 5
    },
    {
      id: 'soc-6',
      platform: 'Instagram',
      label: 'Instagram',
      url: 'https://www.instagram.com/abrarshah621',
      iconName: 'Instagram',
      isActive: true,
      order: 6
    },
    {
      id: 'soc-7',
      platform: 'TikTok',
      label: 'TikTok',
      url: 'https://www.tiktok.com/@abrarshah1711',
      iconName: 'TikTok',
      isActive: true,
      order: 7
    }
  ],
  settings: {
    siteName: 'Abrar Shah - Portfolio & Network Engineering',
    brandName: 'EXPORTON NETWORKS',
    tagline: 'Computer Science Student & Networking Enthusiast',
    metaTitle: 'Abrar Shah | Computer Science & Network Engineering Portfolio',
    metaDescription: 'Official portfolio of Abrar Shah (Exporton Networks) - BS Computer Science student, network engineering practitioner, CCNA/CCNP learner, and IT specialist.',
    keywords: 'Abrar Shah, Exporton Networks, Computer Science, Computer Networking, Network Engineer, Cisco Packet Tracer, GNS3, AWKUM, DIT, OSPF, VLAN',
    ogImageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
    canonicalUrl: '',
    analyticsId: '',
    contactEmail: 'abrarshah2134896@gmail.com',
    contactPhone: '+92 310 1905776',
    whatsappNumber: '+92 310 1905776',
    allowContactForm: true,
    defaultTheme: 'light'
  }
};
