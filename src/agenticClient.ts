import axios from 'axios';

interface ProductConcept {
  title: string;
  description: string;
  goals: string[];
  targetMarket: string;
  timeline: string;
}

export class MCPClientAgent {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async runWorkflow(input: ProductConcept) {
    console.log('[Discovery] Starting agentic workflow for product:', input.title);

    const marketResearch = await this.createMarketResearch(input);
    const prd = await this.createPRD(input);
    const prototype = await this.createPrototype(input);
    const prfaq = await this.createPRFAQ(input);
    const validation = await this.validatePRD(prd.id);

    return {
      executiveSummary: `PM automation run for: ${input.title}`,
      prd,
      prototype,
      marketResearch,
      prfaq,
      validation
    };
  }

  private async createMarketResearch(input: ProductConcept) {
    const response = await axios.post(`${this.baseUrl}/market_research`, {
      title: `Market Research for ${input.title}`,
      version: '1.0',
      metadata: { region: 'Global', industry: input.targetMarket },
      content: {
        competitive_analysis: `Competitor review for ${input.description}`,
        market_sizing: 'Est. $1B TAM',
        user_personas: ['Persona A', 'Persona B'],
        user_journeys: ['User signs up', 'User explores feature']
      }
    });
    return response.data;
  }

  private async createPRD(input: ProductConcept) {
    const response = await axios.post(`${this.baseUrl}/prd`, {
      title: `${input.title} PRD`,
      version: '1.0',
      metadata: { owner: 'pm@agent', status: 'draft', tags: ['auto'] },
      content: {
        overview: input.description,
        problem_statement: 'This product solves key PM bottlenecks.',
        goals: input.goals,
        requirements: ['Agentic orchestration', 'Tool triggering', 'Versioning'],
        success_metrics: ['Time saved', 'Document completeness', 'Launch success']
      }
    });
    return response.data;
  }

  private async createPrototype(input: ProductConcept) {
    const response = await axios.post(`${this.baseUrl}/prototype`, {
      title: `Prototype for ${input.title}`,
      version: '1.0',
      metadata: { design_tool_url: '', status: 'in_progress' },
      content: {
        wireframes: ['Home screen', 'Workflow designer'],
        user_flows: ['Create > Generate > Validate > Export'],
        design_specs: 'Responsive UI with workflow stages'
      }
    });
    return response.data;
  }

  private async createPRFAQ(input: ProductConcept) {
    const response = await axios.post(`${this.baseUrl}/pr_faq`, {
      title: `PRFAQ for ${input.title}`,
      version: '1.0',
      metadata: { author: 'pm@agent' },
      content: {
        press_release: `Introducing ${input.title} – Your next-gen PM assistant.`,
        faqs: [
          { question: 'Who is this for?', answer: 'Product managers and strategy leads.' },
          { question: 'What does it do?', answer: 'Automates PRD, design, research, and docs.' }
        ]
      }
    });
    return response.data;
  }

  private async validatePRD(prdId: string) {
    const prd = await axios.get(`${this.baseUrl}/prd/${prdId}`);
    const response = await axios.post(`${this.baseUrl}/tools/validate_requirements`, prd.data);
    return response.data;
  }
}