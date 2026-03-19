export const projects = [
  {
  id: 1,
  title: "TF-IDF Semantic Search System",
  shortDesc: "NLP-based semantic search for parliamentary Q&A",
  problemSolved: "Keyword-based search fails to capture semantic meaning in large textual datasets like parliamentary records",
  
  description:
    "Developed a semantic search system to retrieve Indian Parliament Question & Answer records using natural language queries. Built an end-to-end NLP pipeline with TF-IDF vectorization and cosine similarity for accurate document ranking. Implemented text preprocessing using NLTK and deployed an interactive interface with Streamlit for real-time querying and analysis.",
  
  techStack: [
    "Python",
    "TF-IDF",
    "Scikit-learn",
    "NLTK",
    "Cosine Similarity",
    "Streamlit"
  ],
  
  liveURL: null,
  githubURL: "https://github.com/rbrajbardhan/TF-IDF-semantic-search-system",
  
  category: "ai/ml",
  badge: "NLP",
  
  metrics: "Improved semantic relevance in search results",
  
  featured: true,
  status: "Completed",
  date: "Dec 2025",
  },
  {
  id: 2,
  title: "Premium E-commerce Platform",
  shortDesc: "Full-stack e-commerce with analytics dashboard",
  
  problemSolved:
    "Lack of scalable e-commerce platforms with real-time analytics, accurate revenue tracking, and reliable inventory management",
  
  description:
    "Architected a premium full-stack e-commerce platform delivering a seamless shopping experience for curated lifestyle products. Built a scalable Django backend with complex SQL aggregations for real-time sales analytics. Ensured data consistency using atomic transactions for inventory management, including stock deduction and restoration. Developed a modern Glassmorphism UI along with an executive dashboard for automated inventory alerts and accurate revenue tracking excluding cancelled transactions.",
  
  techStack: [
    "Django",
    "Python",
    "SQL",
    "React",
    "Glassmorphism UI",
    "Dashboard Analytics"
  ],
  
  liveURL: null,
  githubURL: "https://github.com/rbrajbardhan/django-ecommerce",
  
  category: "fullstack",
  badge: "E-commerce",
  
  metrics: "Real-time analytics + automated inventory tracking",
  
  featured: false,
  status: "Completed",
  date: "Feb 2026",
  },
  {
  id: 3,
  title: "Market Research Assistant",
  shortDesc: "AI-powered business insights & market analysis platform",
  
  problemSolved:
    "Businesses and analysts lack a unified platform to generate real-time market insights, competitive analysis, and industry trends from multiple data sources",
  
  description:
    "Developed an AI-powered market research assistant that generates business insights, market analysis, and competitive intelligence using multiple APIs. Integrated Google Gemini API for intelligent analysis, News API for real-time news data, and Alpha Vantage API for stock and cryptocurrency market data. Built a robust backend with Express.js offering RESTful endpoints for SWOT analysis, market reports, trend analysis, and company insights, enabling data-driven decision making.",
  
  techStack: [
    "Node.js",
    "Express.js",
    "Gemini API",
    "News API",
    "Alpha Vantage API",
    "REST APIs"
  ],
  
  liveURL: null,
  githubURL: "https://github.com/rbrajbardhan/AI-Powered-Market-Research-Intelligence-Assistant",
  
  category: "aiml",
  badge: "AI",
  
  metrics: "Multi-source real-time market insights generation",
  
  featured: true,
  status: "Completed",
  date: "Apr 2025",
  },
];
