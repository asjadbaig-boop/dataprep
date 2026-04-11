export const TECH_DATA = [
  { icon: '🗄️', title: 'SQL',                     accent: '#0078D4', desc: 'Joins, window functions, CTEs, indexing — the foundation of every data interview.' },
  { icon: '🐍', title: 'Python',                  accent: '#3776AB', desc: 'Data manipulation, pandas, list comprehensions, OOP — Python for data roles.' },
  { icon: '⚡', title: 'PySpark',                 accent: '#E25A1C', desc: 'Distributed processing, RDDs, DataFrames, Spark optimisation — big data ready.' },
  { icon: '🔧', title: 'Azure Data Factory',      accent: '#0078D4', desc: 'Pipelines, triggers, linked services, data flows — ADF end to end.' },
  { icon: '🧱', title: 'Azure Databricks',        accent: '#FF3621', desc: 'Clusters, notebooks, Delta Lake, Unity Catalog — modern lakehouse architecture.' },
  { icon: '🌐', title: 'Azure Synapse Analytics', accent: '#7B2D8B', desc: 'Dedicated pools, serverless SQL, integration pipelines — the full analytics platform.' }
];

export const techResources = {
  SQL: {
    icon: '🗄️',
    accentColor: '#0078D4',
    description: 'Window functions, CTEs, joins, indexing and query optimisation questions.',
    pdfs: [
      { name: 'SQL Interview Questions - Complete Guide', path: './pdfs/sql/sql-interview-questions.pdf' }
    ]
  },
  Python: {
    icon: '🐍',
    accentColor: '#3776AB',
    description: 'Pandas, list comprehensions, OOP, data manipulation and problem solving.',
    pdfs: [
      { name: 'Python Interview Questions - Data Engineering', path: './pdfs/python/python-interview-questions.pdf' }
    ]
  },
  PySpark: {
    icon: '⚡',
    accentColor: '#E25A1C',
    description: 'RDDs, DataFrames, transformations, Spark optimisation and partitioning.',
    pdfs: [
      { name: 'PySpark Interview Questions - Complete Guide', path: './pdfs/pyspark/pyspark-interview-questions.pdf' }
    ]
  },
  'Azure Data Factory': {
    icon: '🔧',
    accentColor: '#0078D4',
    description: 'Pipelines, triggers, linked services, data flows and ADF architecture.',
    pdfs: [
      { name: 'ADF Interview Questions - End to End', path: './pdfs/adf/adf-interview-questions.pdf' }
    ]
  },
  'Azure Databricks': {
    icon: '🧱',
    accentColor: '#FF3621',
    description: 'Clusters, notebooks, Delta Lake, Unity Catalog and lakehouse patterns.',
    pdfs: [
      { name: 'Databricks Interview Questions - Full Guide', path: './pdfs/databricks/databricks-interview-questions.pdf' }
    ]
  },
  'Azure Synapse': {
    icon: '🌐',
    accentColor: '#7B2D8B',
    description: 'Dedicated pools, serverless SQL, integration pipelines and Synapse architecture.',
    pdfs: [
      { name: 'Synapse Analytics Interview Questions', path: './pdfs/synapse/synapse-interview-questions.pdf' }
    ]
  }
};
