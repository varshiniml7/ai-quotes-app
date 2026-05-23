type Props = {
  quote: string;
};

export default function QuoteCard({ quote }: Props) {
  return (
    <div className="w-full max-w-2xl bg-zinc-900 p-8 rounded-2xl shadow-lg border border-zinc-700">
      {quote ? (
        <p className="text-2xl text-center leading-relaxed">
          “{quote}”
        </p>
      ) : (
        <p className="text-gray-400 text-center">
          Click the button to generate a quote
        </p>
      )}
    </div>
  );
}