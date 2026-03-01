export default function SectionLabel({ text }) {
  return (
    <p
      style={{ fontFamily: "'DM Mono', monospace" }}
      className="text-xs text-[#FF9D00]/60 tracking-widest uppercase mb-8"
    >
      {text}
    </p>
  );
}