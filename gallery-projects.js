// Content drawn from Harshal Patil — Freelance CV v2.pdf.
// Images are generated concept illustrations, not production screenshots.
export const galleryProjects = {
  migration: {
    title: 'Cloud migration management',
    category: 'Cloud & operations', type: 'Enterprise project · Azure workflows',
    image: 'cloud-migration', imageAlt: 'Clay cloud, application portal, document check, and server stack connected into a workflow',
    intro: 'A connected platform for registration, verification, appointments, and resettlement. Automated document extraction and Azure sign-in support the operational workflow from intake onward.',
    points: ['Registration, document verification, appointment, and resettlement modules.', 'Azure AI Document Intelligence for automated extraction from documents.', 'Service Bus integration and Azure AD B2C sign-in.'],
    scope: 'Application workflows, document intelligence, and cloud integration.',
    tags: ['Angular', 'ASP.NET Core', 'Service Bus', 'Document Intelligence', 'Azure AD B2C'],
    cardTags: ['Angular', 'ASP.NET Core', 'Azure']
  },
  lending: {
    title: 'Loan application platform',
    category: 'Lending & workflows', type: 'Client project · in development', status: 'In development',
    image: 'lending-platform', imageAlt: 'Clay application form, document sheets, and approval token representing a lending review workflow',
    intro: 'A web-based lending platform that brings borrower applications, document handling, and review into one workflow. Built with .NET, Angular, and SQL Server on Azure.',
    points: ['Borrower application workflows for a lending client.', 'Document handling as part of the application process.', 'A review workflow backed by .NET, Angular, SQL Server, and Azure.'],
    scope: 'Currently in development for a lending client.',
    tags: ['.NET', 'Angular', 'SQL Server', 'Azure'],
    cardTags: ['.NET', 'Angular', 'SQL Server']
  },
  ehr: {
    title: 'Electronic health records',
    category: 'Healthcare & care teams', type: 'Enterprise project · clinical workflows',
    image: 'health-records', imageAlt: 'Clay medical record folder, signature pen, message bubble, and lock',
    intro: 'A multi-module EHR platform covering nursing care, assessments, e-signatures, and chat. Role-based access organizes how care teams use patient records and supporting workflows.',
    points: ['Role-based access across a multi-module EHR application.', 'Nursing care and assessment workflows.', 'Electronic signatures and chat, built with Angular, ASP.NET Core, and Hangfire.'],
    scope: 'Clinical application modules and role-based workflows.',
    tags: ['Angular', 'ASP.NET Core', 'Hangfire'],
    cardTags: ['Angular', 'ASP.NET Core', 'Hangfire']
  },
  etl: {
    title: 'Event-driven data mapping',
    category: 'Data & integration', type: 'Enterprise project · serverless ETL',
    image: 'data-pipeline', imageAlt: 'Clay data containers feeding colorful blocks through connected pipes into a central transformation module',
    intro: 'A serverless ETL platform for moving data across distributed systems. Azure Functions and Service Bus support the flow, with a reusable NuGet package for microservice operations.',
    points: ['Extraction, transformation, and loading across distributed systems.', 'Event-driven workflows using Azure Functions and Service Bus.', 'A reusable NuGet package for shared microservice operations.'],
    scope: 'Serverless data processing and reusable service integration.',
    tags: ['Azure Functions', 'Service Bus', 'EF Core', 'NuGet'],
    cardTags: ['Azure Functions', 'Service Bus', 'EF Core']
  },
  search: {
    title: 'Enterprise global search',
    category: 'Search & discovery', type: 'Enterprise project · multi-source search',
    image: 'enterprise-search', imageAlt: 'Clay magnifying glass beside a database and a fan of document cards',
    intro: 'Search and transformation across structured and unstructured information. The platform brings together databases, files, and cloud storage using Azure AI Search, Azure SQL, and MongoDB.',
    points: ['Search over structured and unstructured data.', 'Information sourced from databases, files, and cloud storage.', 'Azure AI Search integration with Azure SQL and MongoDB.'],
    scope: 'Search and data transformation across multiple source types.',
    tags: ['Azure AI Search', 'Azure SQL', 'MongoDB'],
    cardTags: ['Azure AI Search', 'Azure SQL', 'MongoDB']
  },
  vitalscan: {
    title: 'VitalScan / ZKare',
    category: 'Healthcare & diagnostics', type: 'Product · shared platform architecture',
    image: 'healthcare-diagnostics', imageAlt: 'Clay medical hub connected to stylized diagnostic modules',
    intro: 'A healthcare diagnostics platform designed around a shared core. It serves multiple segments through a common foundation for the product’s different diagnostic verticals.',
    points: ['A multi-vertical healthcare diagnostics platform.', 'Several healthcare segments served by one shared core.', 'Product architecture centered on a common platform foundation.'],
    scope: 'Multi-segment diagnostics on one shared platform.',
    tags: ['Healthcare diagnostics', 'Shared core', 'Multi-vertical platform'],
    cardTags: ['Healthcare', 'Shared core', 'Diagnostics']
  },
  fintasense: {
    title: 'FintaSense',
    category: 'Fintech & analytical systems', type: 'Product · US institutional clients',
    image: 'portfolio-modeling', imageAlt: 'Balanced clay portfolio blocks, allocation rings, and a small analytical model tile',
    intro: 'An adaptive portfolio optimization product for US institutional clients. A market-regime model informs the optimization approach, connecting analytical modeling with portfolio decisions.',
    points: ['Adaptive portfolio optimization.', 'A market-regime model driving the approach.', 'Designed for US institutional clients.'],
    scope: 'Portfolio optimization and market-regime modeling.',
    tags: ['Portfolio optimization', 'Market-regime modeling', 'Institutional clients'],
    cardTags: ['Fintech', 'Optimization', 'Modeling']
  },
  dvr: {
    title: 'DVR.AI',
    category: 'Edge AI & computer vision', type: 'Product · on-premise deployment',
    image: 'edge-vision', imageAlt: 'Clay AI camera with a teal lens, embedded processor, and small connected sensor devices',
    intro: 'An on-premise AI camera system built around NVIDIA Jetson. The product work spans computer vision, face-recognition systems, and connected IoT devices at the edge.',
    points: ['A Jetson-based AI camera system.', 'Related face-recognition and IoT products.', 'On-premise deployment of edge vision capabilities.'],
    scope: 'Computer vision and connected devices on local hardware.',
    tags: ['NVIDIA Jetson', 'Computer vision', 'Edge AI', 'IoT'],
    cardTags: ['NVIDIA Jetson', 'Computer vision', 'IoT']
  },
  business: {
    title: 'SiteStock & SignAds',
    category: 'Business apps & operations', type: 'Products · inventory and enquiry workflows',
    image: 'business-apps', imageAlt: 'Clay inventory boxes and warehouse shelf beside a tablet and a freestanding display sign',
    intro: 'Two business applications with focused operational needs: a construction materials and inventory PWA, and a signage company website with enquiry capture and a private admin area.',
    points: ['SiteStock: construction materials purchase and inventory workflows.', 'An Angular PWA with ASP.NET Core and PostgreSQL.', 'SignAds: a React signage website on Cloudflare with enquiry capture and a private admin area.'],
    scope: 'Inventory management and customer-enquiry workflows.',
    tags: ['Angular PWA', 'ASP.NET Core', 'PostgreSQL', 'React', 'Cloudflare'],
    cardTags: ['Angular PWA', 'ASP.NET Core', 'React']
  }
};

export const digitizationProjects = {
  scanning: {
    title: 'Scanning & digitization',
    category: 'Paper to digital', type: 'Digitization projects · regulated scanning',
    image: 'document-management', imageAlt: 'Clay document scanner capturing a page beside organized folders and a check-mark shield',
    intro: 'Digitization work focused on scanning physical documents into digital records. Regulated scanning projects form a distinct part of my enterprise document-systems experience.',
    points: ['Paper-to-digital document scanning.', 'Regulated scanning work for enterprise and public-sector organizations.', 'Document-capture projects within a broader scanning and DMS portfolio.'],
    scope: 'Focus: document scanning and digital capture.',
    tags: ['Document scanning', 'Digitization', 'Digital capture'],
    cardTags: ['Scanning', 'Digitization', 'Digital capture']
  },
  documents: {
    title: 'Document management system (DMS)',
    category: 'Digital records & applications', type: 'Enterprise document-management systems',
    image: 'dms-records', imageAlt: 'Clay digital archive cabinet with document folders, a magnifying glass, and an access-control shield',
    intro: 'Document-management applications for working with digital enterprise records. My work spans C# and ASP.NET systems backed by SQL Server and Oracle.',
    points: ['Enterprise document-management applications.', 'C# and ASP.NET application development.', 'Database-backed systems using SQL Server and Oracle.'],
    scope: 'Focus: document-management software and enterprise records.',
    tags: ['C#', 'ASP.NET', 'SQL Server', 'Oracle'],
    cardTags: ['C#', 'ASP.NET', 'SQL Server']
  }
};
