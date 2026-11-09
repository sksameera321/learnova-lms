export const CATEGORIES = [
  'All Disciplines',
  'Systems Architecture',
  'Artificial Intelligence',
  'Full-Stack Engineering',
  'Cybersecurity',
  'Product Design & Creative Tech',
  'Quantum Computing'
];

export const DIFFICULTIES = ['All Levels', 'Foundational', 'Intermediate', 'Advanced'];

export const COURSES = [
  {
    id: 'gen-ai-agents',
    title: 'Artificial Intelligence Architecture: Neural Models & Autonomous Systems',
    tagline: 'Learn how to architect resilient multi-agent swarms, hybrid semantic search, and production-grade LLM pipelines.',
    description: 'A comprehensive masterclass on modern generative systems engineering. Move beyond simple API wrappers to architect autonomous agent swarms, implement hybrid semantic search RAG with reciprocal rank fusion, enforce schema guarantees, and deploy observable pipelines under strict throughput SLAs.',
    category: 'Artificial Intelligence',
    difficulty: 'Advanced',
    duration: '14h 30m',
    lessonsCount: 16,
    modulesCount: 4,
    rating: 4.96,
    reviewsCount: 384,
    enrolledCount: 1840,
    featured: true,
    popular: true,
    thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    banner: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1800&q=80',
    badge: 'Flagship Masterclass',
    instructor: {
      name: 'Dr. Aris Thorne',
      role: 'Principal Research Architect',
      organization: 'Ex-DeepMind / AI Systems Lab',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      bio: 'Dr. Thorne has researched neural architecture search and autonomous systems for over a decade. Author of "The Agentic Paradigm" with 40+ peer-reviewed publications.'
    },
    learningObjectives: [
      'Design reliable ReAct and reasoning loops that recover gracefully from tool dispatch errors',
      'Implement hybrid sparse-dense RAG combining vector embeddings and reciprocal rank fusion',
      'Construct stateful multi-agent orchestrations with deterministic conflict resolution',
      'Deploy continuous evaluation benchmarks and guardrail telemetry in production',
      'Optimize token caching, prompt compression, and latency SLAs under high throughput'
    ],
    skillsCovered: ['Agent Architectures', 'RAG Pipelines', 'Vector Indexing', 'Schema Enforcement', 'Production Telemetry', 'Python & TypeScript SDKs'],
    prerequisites: ['Proficiency with Python or modern JavaScript', 'Understanding of REST APIs and async paradigms', 'Familiarity with transformer model concepts'],
    modules: [
      {
        id: 'm1',
        title: 'Module 1: The Architecture of Autonomous Agents',
        lessons: [
          {
            id: 'lesson-1-1',
            title: '1.1 Foundations of ReAct & Reasoning Loops',
            duration: '22:15',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            preview: true,
            description: 'Unpack the fundamental mechanics of the ReAct (Reasoning + Acting) loop. Discover how models transition between internal reflection, tool dispatch, and sensory observation ingestion to solve multi-hop reasoning tasks.',
            codeSnippet: `// Canonical ReAct Loop in TypeScript
async function executeAgentStep(goal, memory, tools) {
  const prompt = constructPrompt({ goal, history: memory.getLog() });
  const thought = await model.generate({ prompt, stop: ["Observation:"] });
  
  if (thought.includes("Action:")) {
    const { toolName, args } = parseAction(thought);
    const observation = await tools[toolName].invoke(args);
    memory.append({ thought, action: toolName, observation });
    return { status: "CONTINUE" };
  }
  return { status: "COMPLETE", result: thought };
}`,
            resources: [
              { title: 'ReAct Formal Architecture Whitepaper (PDF)', type: 'PDF', url: '#', size: '2.4 MB' },
              { title: 'Agent Loop Scaffold Starter Code', type: 'ZIP', url: '#', size: '1.1 MB' }
            ]
          },
          {
            id: 'lesson-1-2',
            title: '1.2 Schema-Enforced Structured Tool Calling',
            duration: '18:40',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            preview: false,
            description: 'Learn how to enforce JSON Schema guarantees using constrained decoding, Pydantic, and Zod definitions so that LLMs produce zero parsing exceptions during tool dispatch.',
            codeSnippet: `import { z } from 'zod';

export const WeatherToolSchema = z.object({
  city: z.string().describe("Target metropolitan municipality"),
  unit: z.enum(["celsius", "fahrenheit"]).default("celsius"),
  includeForecast: z.boolean().default(false)
});`,
            resources: [
              { title: 'Type-Safe Tool Binder Library', type: 'Code', url: '#', size: '340 KB' }
            ]
          },
          {
            id: 'lesson-1-3',
            title: '1.3 Dynamic Context Windows & Memory Pruning',
            duration: '25:10',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            preview: false,
            description: 'Strategies for sliding window conversation summarization, semantic entity tagging, and episodic vs working memory structures in long-running agent threads.',
            codeSnippet: `// Active context summarization
function pruneConversationHistory(messages, maxTokens = 8000) {
  if (estimateTokens(messages) <= maxTokens) return messages;
  const pinnedSystem = messages[0];
  const recentTurns = messages.slice(-6);
  const summary = summarizeHistoricalContext(messages.slice(1, -6));
  return [pinnedSystem, { role: "system", content: summary }, ...recentTurns];
}`,
            resources: [
              { title: 'Memory Compaction Benchmarks', type: 'PDF', url: '#', size: '1.8 MB' }
            ]
          }
        ]
      },
      {
        id: 'm2',
        title: 'Module 2: High-Recall Hybrid Retrieval (RAG)',
        lessons: [
          {
            id: 'lesson-2-1',
            title: '2.1 Semantic Vector Indexing & Sparse BM25 Fusion',
            duration: '24:00',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            preview: false,
            description: 'Why pure vector similarity fails on exact keywords and technical jargon, and how Reciprocal Rank Fusion (RRF) delivers bulletproof 99.4% precision across technical corpora.',
            codeSnippet: `function reciprocalRankFusion(vectorResults, keywordResults, k = 60) {
  const scoreMap = new Map();
  const addRank = (item, rank) => {
    const current = scoreMap.get(item.id) || { item, score: 0 };
    current.score += 1 / (k + rank);
    scoreMap.set(item.id, current);
  };
  vectorResults.forEach((item, idx) => addRank(item, idx + 1));
  keywordResults.forEach((item, idx) => addRank(item, idx + 1));
  return Array.from(scoreMap.values()).sort((a, b) => b.score - a.score);
}`,
            resources: [
              { title: 'RRF Implementation Guide (PDF)', type: 'PDF', url: '#', size: '1.9 MB' }
            ]
          }
        ]
      }
    ],
    quiz: {
      id: 'quiz-gen-ai',
      title: 'Mastery Certification: Artificial Intelligence Architecture',
      passingScore: 75,
      questions: [
        {
          id: 'q1',
          question: 'In the classic ReAct agent pattern, what is the exact function of the "Observation" step?',
          options: [
            'It sends the final rendered HTML response to the end user.',
            'It captures the output or feedback returned by a tool invocation for the model to reason about in the next cycle.',
            'It acts as an authentication guard to verify API credentials.',
            'It forces the model to truncate historical context tokens to save memory.'
          ],
          correctAnswer: 1,
          explanation: 'The Observation step ingests the real-world execution payload returned by a dispatched tool (e.g. database result or API response) so the model can reflect upon it before deciding whether to finish or call another tool.'
        },
        {
          id: 'q2',
          question: 'Why is Reciprocal Rank Fusion (RRF) frequently combined with dense vector embeddings in high-precision RAG?',
          options: [
            'Because vector embeddings cannot represent numerical values.',
            'Because RRF eliminates the need for any embedding model or database.',
            'Because sparse keyword search excels at exact matches (skus, IDs, names) while dense embeddings capture semantic meaning.',
            'Because RRF compresses the vector dimensions down to 8 bits automatically.'
          ],
          correctAnswer: 2,
          explanation: 'Dense semantic embeddings understand contextual concepts ("heart attack" matches "myocardial infarction"), but can struggle with exact serial codes, acronyms, or specific proper nouns where BM25 keyword matching shines. RRF combines both score distributions with zero calibration needed.'
        },
        {
          id: 'q3',
          question: 'What is the primary function of a "Critic" agent in a multi-agent self-correcting loop?',
          options: [
            'To block users from querying the model after business hours.',
            'To rigorously inspect, test, or validate the output of a generator agent and provide structured feedback for refinement.',
            'To translate foreign language inputs into English before tokenization.',
            'To serve as a persistent key-value store for user session cookies.'
          ],
          correctAnswer: 1,
          explanation: 'A Critic agent assesses candidate answers against unit tests, schema rules, or qualitative rubrics, providing targeted critiques so the generator agent can iteratively fix mistakes before final delivery.'
        },
        {
          id: 'q4',
          question: 'Which method best safeguards against hallucinated parameters when executing external API tools?',
          options: [
            'Increasing model temperature to 1.5.',
            'Removing system prompts entirely.',
            'Constrained decoding using JSON Schema (e.g., Zod / Pydantic validation) with deterministic parsing.',
            'Allowing free-form unstructured markdown responses only.'
          ],
          correctAnswer: 2,
          explanation: 'Constrained decoding forces the LLM to emit tokens conforming strictly to a formal schema, preventing hallucinated keys or invalid types.'
        }
      ]
    }
  },
  {
    id: 'distributed-systems',
    title: 'Distributed Systems at Scale: Architecture, Fault Tolerance & Consensus',
    tagline: 'Master partition tolerance, Paxos, Raft consensus, vector clocks, and resilient event-driven architectures.',
    description: 'Learn the foundational principles that allow hyper-scale systems like CockroachDB, Kubernetes, and Kafka to maintain strong consistency and high availability across unreliable global networks. Implement Raft leader elections, gossip protocols, and distributed transactions with two-phase commit.',
    category: 'Systems Architecture',
    difficulty: 'Advanced',
    duration: '18h 00m',
    lessonsCount: 20,
    modulesCount: 5,
    rating: 4.95,
    reviewsCount: 295,
    enrolledCount: 1120,
    featured: true,
    popular: false,
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    banner: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1800&q=80',
    badge: 'Master Series',
    instructor: {
      name: 'Elena Rostova',
      role: 'Principal Infrastructure Architect',
      organization: 'Ex-AWS DynamoDB Team',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      bio: 'Elena has built globally replicated storage fabrics serving millions of operations per second. Frequent keynote speaker on distributed consistency.'
    },
    learningObjectives: [
      'Implement the Raft consensus algorithm including leader elections and log replication',
      'Resolve concurrent write conflicts using Lamport timestamps and Vector Clocks',
      'Understand the trade-offs of the CAP theorem and PACELC in production databases',
      'Design idempotent Saga orchestrations for distributed cross-service transactions',
      'Handle split-brain scenarios and network partitions gracefully'
    ],
    skillsCovered: ['Raft Consensus', 'Vector Clocks', 'Distributed Transactions', 'Sagas & CQRS', 'Gossip Protocols', 'Go & Rust Systems'],
    prerequisites: ['Solid understanding of operating systems and networking (TCP/IP)', 'Familiarity with concurrency concepts (mutexes, threads, channels)', 'Intermediate programming ability'],
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Time, Order, and Logical Clocks',
        lessons: [
          {
            id: 'lesson-ds-1-1',
            title: '1.1 Physical Clocks, NTP Drift & TrueTime',
            duration: '26:30',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4',
            preview: true,
            description: 'Why physical wall-clock time is fundamentally broken in distributed systems, how NTP introduces unbounded clock skew, and how Google Spanner uses GPS and atomic clocks.',
            codeSnippet: `// Vector Clock Tick implementation
class VectorClock {
  constructor(nodeId) {
    this.nodeId = nodeId;
    this.clock = { [nodeId]: 0 };
  }
  tick() {
    this.clock[this.nodeId] = (this.clock[this.nodeId] || 0) + 1;
  }
  merge(remoteClock) {
    for (const [node, time] of Object.entries(remoteClock)) {
      this.clock[node] = Math.max(this.clock[node] || 0, time);
    }
    this.tick();
  }
}`,
            resources: [
              { title: 'Logical Clocks Explained (Paper)', type: 'PDF', url: '#', size: '1.9 MB' }
            ]
          }
        ]
      }
    ],
    quiz: {
      id: 'quiz-distributed',
      title: 'Certification Quiz: Distributed Systems & Consensus',
      passingScore: 70,
      questions: [
        {
          id: 'ds-q1',
          question: 'Why does Raft use randomized election timeouts for candidate nodes?',
          options: [
            'To encrypt network packets before transmission.',
            'To prevent split-vote deadlocks where multiple candidates start elections at the exact same millisecond and split the quorum.',
            'To save CPU battery during night hours.',
            'To ensure that the oldest physical node always becomes the master.'
          ],
          correctAnswer: 1,
          explanation: 'Randomized timeouts ensure that usually only a single candidate times out and requests votes, winning the majority quorum before peers time out.'
        }
      ]
    }
  },
  {
    id: 'react19-fullstack',
    title: 'Modern Full-Stack Engineering: React 19, Systems Design & WebSockets',
    tagline: 'Build ultra-responsive real-time applications with React 19 Actions, Server Components, and bi-directional WebSockets.',
    description: 'Elevate your frontend and full-stack craft to senior engineering standard. Master the React 19 compiler, useActionState, useOptimistic, server-side streaming, robust WebSocket event protocols, and zero-compromise state persistence patterns.',
    category: 'Full-Stack Engineering',
    difficulty: 'Intermediate',
    duration: '22h 15m',
    lessonsCount: 24,
    modulesCount: 6,
    rating: 4.98,
    reviewsCount: 512,
    enrolledCount: 3240,
    featured: true,
    popular: true,
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    banner: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1800&q=80',
    badge: 'Bestseller',
    instructor: {
      name: 'Marcus Vance',
      role: 'Staff Frontend Architect',
      organization: 'Veloce Labs / Ex-Stripe UI Team',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      bio: 'Marcus has architected client applications serving over 50 million monthly active users. Creator of widely adopted open-source state machines.'
    },
    learningObjectives: [
      'Master React 19 new hooks: useActionState, useOptimistic, and the React Compiler',
      'Build resilient bi-directional real-time communication using WebSockets and heartbeat reconnection',
      'Implement optimistic UI updates that seamlessly roll back upon server rejections',
      'Architect modular Context API patterns with fine-grained performance boundaries'
    ],
    skillsCovered: ['React 19 Actions', 'useOptimistic', 'WebSockets', 'Context API Architecture', 'TypeScript', 'Vite & Bundlers'],
    prerequisites: ['Solid understanding of modern JavaScript (ES6+)', 'Familiarity with React fundamentals', 'HTML5 & CSS3 layout fundamentals'],
    modules: [
      {
        id: 'm1',
        title: 'Module 1: React 19 Core Paradigm Shift',
        lessons: [
          {
            id: 'lesson-r-1-1',
            title: '1.1 Form Actions, useActionState & Server Mutations',
            duration: '21:00',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
            preview: true,
            description: 'Simplify asynchronous state management with native action transitions, removing manual loading flags and exception handlers.',
            codeSnippet: `import { useActionState } from 'react';

async function updateProfile(previousState, formData) {
  const name = formData.get('name');
  const res = await api.saveProfile({ name });
  return res.success ? { success: true, name } : { error: res.message };
}`,
            resources: [
              { title: 'React 19 Migration Notes (PDF)', type: 'PDF', url: '#', size: '1.5 MB' }
            ]
          }
        ]
      }
    ],
    quiz: {
      id: 'quiz-react',
      title: 'Certification Quiz: React 19 Architecture',
      passingScore: 70,
      questions: [
        {
          id: 'r-q1',
          question: 'What is the primary benefit of the new React 19 useActionState hook?',
          options: [
            'It compiles JavaScript to WebAssembly automatically.',
            'It encapsulates form mutation logic, pending status, and returned error/data state without manual loading flags.',
            'It eliminates all CSS files from the repository.',
            'It forces the browser to reload the page on every keystroke.'
          ],
          correctAnswer: 1,
          explanation: 'useActionState handles pending transitions, form submission actions, and returned state in a clean, unified hook without manual useState boilerplate.'
        }
      ]
    }
  },
  {
    id: 'offensive-security',
    title: 'Applied Cybersecurity: Defensive Architecture & Threat Intelligence',
    tagline: 'Practical penetration testing, web vulnerability exploitation (OWASP Top 10), and military-grade Zero-Trust architecture.',
    description: 'Learn ethical security from the inside out. Inspect how modern adversaries bypass perimeter firewalls, reverse engineer authorization flaws, exploit server-side request forgery (SSRF), and implement robust Zero-Trust network micro-segmentation with continuous cryptographic identity verification.',
    category: 'Cybersecurity',
    difficulty: 'Intermediate',
    duration: '12h 45m',
    lessonsCount: 14,
    modulesCount: 3,
    rating: 4.92,
    reviewsCount: 198,
    enrolledCount: 940,
    featured: false,
    popular: false,
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    banner: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1800&q=80',
    badge: 'Master Series',
    instructor: {
      name: 'Sarah Chen, CISSP',
      role: 'Red Team Operations Lead',
      organization: 'Aegis Threat Intelligence',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
      bio: 'Sarah leads red-team adversary simulations for tier-one infrastructure providers. Specializes in cloud infrastructure exploitation and cryptographic defense.'
    },
    learningObjectives: [
      'Perform structured vulnerability discovery across modern SPA and API targets',
      'Exploit and remediate Broken Object Level Authorization (BOLA / IDOR)',
      'Construct defense-in-depth Zero-Trust access policies using mTLS and ephemeral tokens'
    ],
    skillsCovered: ['OWASP Top 10', 'BOLA / IDOR Remediation', 'mTLS & Cryptography', 'Zero Trust Architecture'],
    prerequisites: ['Networking fundamentals (DNS, HTTP headers, TCP handshakes)', 'Basic scripting knowledge in Python or JavaScript'],
    modules: [
      {
        id: 'm1',
        title: 'Module 1: The Modern Attack Surface',
        lessons: [
          {
            id: 'lesson-sec-1-1',
            title: '1.1 Zero-Trust Principles: Continuous Verification',
            duration: '24:10',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            preview: true,
            description: 'Why perimeter castle-and-moat security models fail in cloud-native environments and how mutual TLS (mTLS) provides end-to-end cryptographic proof.',
            codeSnippet: `// Mutual TLS Verification Concept
const tlsOptions = {
  key: fs.readFileSync('server-key.pem'),
  cert: fs.readFileSync('server-cert.pem'),
  ca: fs.readFileSync('client-ca.pem'),
  requestCert: true,
  rejectUnauthorized: true
};`,
            resources: [
              { title: 'Zero Trust NIST Special Publication (PDF)', type: 'PDF', url: '#', size: '3.4 MB' }
            ]
          }
        ]
      }
    ],
    quiz: {
      id: 'quiz-sec',
      title: 'Certification Quiz: Zero Trust Security Protocols',
      passingScore: 70,
      questions: [
        {
          id: 'sec-q1',
          question: 'What is the core tenet of the Zero Trust security philosophy?',
          options: [
            'All requests coming from inside the local office Wi-Fi are automatically trusted.',
            'Never trust, always verify: every request, whether internal or external, must be authenticated and authorized based on dynamic context.',
            'Firewalls should never log failed authentication attempts.',
            'Users should never change their passwords.'
          ],
          correctAnswer: 1,
          explanation: 'Zero Trust assumes that adversaries may already be inside the network perimeter, requiring continuous cryptographic identity and context verification for every single request.'
        }
      ]
    }
  },
  {
    id: 'design-systems-webgl',
    title: 'Digital Product Design, Motion & Creative Technology',
    tagline: 'Craft luxury digital interfaces with mathematical typography, design tokens, Three.js, and refined physics.',
    description: 'Transform from a basic web builder into an accomplished creative technologist. Learn how premier studios create world-class digital experiences. Master tokenized design architecture, smooth physics-based gesture interactions, and high-performance WebGL shaders.',
    category: 'Product Design & Creative Tech',
    difficulty: 'Foundational',
    duration: '16h 20m',
    lessonsCount: 18,
    modulesCount: 4,
    rating: 4.97,
    reviewsCount: 420,
    enrolledCount: 2180,
    featured: true,
    popular: true,
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1800&q=80',
    badge: 'Master Series',
    instructor: {
      name: 'Julian Beaumont',
      role: 'Creative Technologist & Studio Director',
      organization: 'Atelier Beaumont / Awwwards Jury Member',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      bio: 'Julian is an internationally celebrated creative director and Awwwards Annual Jury Member with 14 Site of the Day honors. Pioneer in tactile digital interfaces.'
    },
    learningObjectives: [
      'Formulate robust multi-tier design tokens (Primitive, Semantic, Component)',
      'Build physical skeuomorphic and tactile materials with CSS',
      'Master spring physics curves for silky, natural gesture micro-interactions'
    ],
    skillsCovered: ['Design Systems', 'Creative WebGL', 'Spring Physics', 'Micro-Interactions', 'Editorial Typography'],
    prerequisites: ['Basic CSS knowledge', 'Familiarity with modern JavaScript'],
    modules: [
      {
        id: 'm1',
        title: 'Module 1: The Architecture of World-Class Design Systems',
        lessons: [
          {
            id: 'lesson-ds-1',
            title: '1.1 Three-Tier Token Architecture & Theming',
            duration: '22:40',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            preview: true,
            description: 'How enterprise design systems separate primitive color palettes from semantic intent to achieve effortless theming.',
            codeSnippet: `:root {
  --color-sand-500: #c5a059;
  --bg-surface: #151518;
  --accent-primary: var(--color-sand-500);
}`,
            resources: [
              { title: 'Design Token Taxonomy Guide (PDF)', type: 'PDF', url: '#', size: '2.1 MB' }
            ]
          }
        ]
      }
    ],
    quiz: {
      id: 'quiz-ui',
      title: 'Certification Quiz: Design Systems & Creative Engineering',
      passingScore: 70,
      questions: [
        {
          id: 'ui-q1',
          question: 'What is the primary advantage of a three-tier design token architecture over hardcoded values?',
          options: [
            'It decreases image download sizes.',
            'It abstracts raw values into semantic meanings, allowing instantaneous theme swapping and system-wide consistency updates.',
            'It compiles CSS directly to binary machine code.',
            'It forces fonts to render only in uppercase.'
          ],
          correctAnswer: 1,
          explanation: 'Separating primitive values from semantic intent means colors and typography can be updated globally without refactoring individual components.'
        }
      ]
    }
  },
  {
    id: 'quantum-foundations',
    title: 'Quantum Computing & Information Theory',
    tagline: 'Understand superposition, entanglement, quantum gates, and execute real circuits on cloud quantum processors.',
    description: 'Step into the computational frontier. Explore how quantum mechanics enables exponential computational advantages for simulation and optimization. Build and simulate Hadamard gates, Bell states, Quantum Teleportation, and Grover search algorithms.',
    category: 'Quantum Computing',
    difficulty: 'Advanced',
    duration: '10h 15m',
    lessonsCount: 12,
    modulesCount: 3,
    rating: 4.93,
    reviewsCount: 142,
    enrolledCount: 680,
    featured: false,
    popular: false,
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    banner: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1800&q=80',
    badge: 'Master Series',
    instructor: {
      name: 'Prof. Vikramaditya Rao',
      role: 'Quantum Information Physicist',
      organization: 'Centre for Quantum Technologies',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
      bio: 'Prof. Rao has researched superconducting qubit coherence and quantum error correction for 15+ years. Advisor to international quantum computational initiatives.'
    },
    learningObjectives: [
      'Understand quantum state vectors, Dirac bra-ket notation, and Bloch spheres',
      'Construct quantum circuits with Pauli, Hadamard, and Controlled-NOT (CNOT) gates',
      'Demonstrate quantum entanglement by creating Maximally Entangled Bell States'
    ],
    skillsCovered: ['Qiskit', 'Quantum Superposition', 'Bell States', 'Bloch Sphere Geometry', 'Quantum Algorithms'],
    prerequisites: ['Basic linear algebra (vectors, matrices, dot products)', 'Elementary Python programming'],
    modules: [
      {
        id: 'm1',
        title: 'Module 1: The Qubit & State Representation',
        lessons: [
          {
            id: 'lesson-qc-1-1',
            title: '1.1 Superposition & The Bloch Sphere',
            duration: '25:00',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
            preview: true,
            description: 'How a two-level quantum mechanical system differs fundamentally from a classical binary bit, and how superposition represents infinite linear combinations.',
            codeSnippet: `# Qiskit Quantum Circuit for Bell State
from qiskit import QuantumCircuit, Aer, execute

qc = QuantumCircuit(2, 2)
qc.h(0)
qc.cx(0, 1)
qc.measure([0, 1], [0, 1])`,
            resources: [
              { title: 'Quantum Circuit Simulator Notebook', type: 'Jupyter', url: '#', size: '2.9 MB' }
            ]
          }
        ]
      }
    ],
    quiz: {
      id: 'quiz-qc',
      title: 'Certification Quiz: Quantum Information Foundations',
      passingScore: 70,
      questions: [
        {
          id: 'qc-q1',
          question: 'What transformation does a Hadamard (H) gate apply to the computational basis state |0⟩?',
          options: [
            'It flips |0⟩ strictly to |1⟩ with 100% certainty.',
            'It transforms |0⟩ into an equal superposition (|0⟩ + |1⟩) / √2.',
            'It destroys the qubit permanently.',
            'It multiplies the qubit phase by 90 degrees.'
          ],
          correctAnswer: 1,
          explanation: 'The Hadamard gate creates an equal superposition of basis states, giving equal 50% measurement probabilities for both |0⟩ and |1⟩.'
        }
      ]
    }
  }
];

export const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Aarav Sharma',
    role: 'Staff Infrastructure Engineer at Razorpay',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    courseTaken: 'Distributed Systems at Scale',
    quote: 'Elena\'s Raft consensus breakdown helped our team re-architect our multi-region replication fabric with complete confidence. The level of architectural depth is unparalleled.',
    verified: true,
    rating: 5
  },
  {
    id: 't2',
    name: 'Priya Nambiar',
    role: 'Senior AI Engineer at Cohere',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    courseTaken: 'Artificial Intelligence Architecture',
    quote: 'Dr. Thorne cuts straight through the generic hype. The modules on structured tool calling and hybrid RAG rank among the highest caliber industry training I have experienced.',
    verified: true,
    rating: 5
  },
  {
    id: 't3',
    name: 'Devin Cole',
    role: 'Creative Technologist at Studio Koto',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
    courseTaken: 'Digital Product Design, Motion & Creative Technology',
    quote: 'The video theatre, code scratchpad, and interactive quizzes made continuous learning deeply engaging. Completed my certification in two weeks.',
    verified: true,
    rating: 5
  }
];

export const PLATFORM_STATS = [
  { label: 'Active Learners', value: '48,000+' },
  { label: 'Course Completion Rate', value: '94.2%' },
  { label: 'Master Instructors', value: '18 Industry Leaders' },
  { label: 'Interactive Lessons & Labs', value: '350+' }
];
