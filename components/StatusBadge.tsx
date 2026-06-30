const STATUS_CONFIG: Record<string, { dot: string; text: string }> = {
  'Request Received': { dot: 'bg-blue-400', text: 'text-blue-700' },
  'Quote Sent':       { dot: 'bg-purple-400', text: 'text-purple-700' },
  'Waiting for Wig':  { dot: 'bg-orange-400', text: 'text-orange-700' },
  'Wig Received':     { dot: 'bg-teal-400', text: 'text-teal-700' },
  'In Repair':        { dot: 'bg-yellow-400', text: 'text-yellow-700' },
  'Ready for Payment':{ dot: 'bg-red-400', text: 'text-red-700' },
  'Shipped Back':     { dot: 'bg-indigo-400', text: 'text-indigo-700' },
  'Completed':        { dot: 'bg-green-400', text: 'text-green-700' },
  'Canceled':         { dot: 'bg-gray-300', text: 'text-gray-500' },
};

export default function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] ?? { dot: 'bg-gray-300', text: 'text-gray-500' };
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium tracking-wide ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {status}
    </span>
  );
}
