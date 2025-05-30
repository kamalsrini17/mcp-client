import { MCPClientAgent } from './agenticClient';

const agent = new MCPClientAgent('http://localhost:3000');

agent.runWorkflow({
  title: 'AI PM Assistant',
  description: 'An automated product management workflow engine.',
  goals: ['Speed up planning', 'Improve quality', 'Enable iteration'],
  targetMarket: 'SaaS PMs',
  timeline: 'Q3 2025'
}).then(pkg => {
  console.log('🧠 Full PM Workflow Output:\n');
  console.dir(pkg, { depth: null });
});