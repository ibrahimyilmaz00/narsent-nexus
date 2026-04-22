export const kanbanData = {
  columns: [
    { id: 'todo', title: 'Atanan İş Emirleri', color: 'bg-blue-500' },
    { id: 'in-progress', title: 'İşlemde / Görüşülüyor', color: 'bg-amber-500' },
    { id: 'done', title: 'Tamamlanan Tahsilatlar', color: 'bg-emerald-500' }
  ],
  tasks: [
    { id: '0095-s1', accountId: '0095', accountName: 'Demirören Yapı A.Ş.', title: 'Acil Görüşme & Yapılandırma', amount: '12.1M TL', priority: 'High', type: 'Call', status: 'todo' },
    { id: '0378-s1', accountId: '0378', accountName: 'Kalyon İnşaat', title: 'İskonto Teklifi İlet', amount: '9.4M TL', priority: 'Medium', type: 'Email', status: 'in-progress' },
    { id: '0015-s2', accountId: '0015', accountName: 'Limak Enerji', title: 'Hukuki İhtar Hazırlığı', amount: '4.2M TL', priority: 'High', type: 'Legal', status: 'todo' }
  ]
};
