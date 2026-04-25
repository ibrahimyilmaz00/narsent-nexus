export const settingsData = {
  workspace: {
    name: "Narsenti Teknoloji A.Ş.",
    logo: null as string | null,
    language: 'tr',
    theme: 'dark'
  },
  integrations: [
    { id: 'logo',   name: 'Logo ERP',      status: 'connected',    icon: 'Database'      },
    { id: 'slack',  name: 'Slack',          status: 'disconnected', icon: 'MessageSquare' },
    { id: 'netgsm', name: 'NetGSM (SMS)',   status: 'connected',    icon: 'Smartphone'    },
    { id: 'smtp',   name: 'SMTP Mail',      status: 'connected',    icon: 'Mail'          }
  ],
  team: [
    { id: 1, name: 'Halil İbrahim Yılmaz', email: 'halil@narsenti.com', role: 'Yönetici',        status: 'active' },
    { id: 2, name: 'CFO User',              email: 'cfo@narsenti.com',   role: 'Tahsilat Uzmanı', status: 'active' }
  ]
};
