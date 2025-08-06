import "./styles.css";

type SoundWaveProps = {
  active?: boolean;
  barCount?: number;
  color?: string;
};

const SoundWave = ({
  active = true,
  barCount = 5,
  color = "bg-red-700",
}: SoundWaveProps) => {
  const inactiveWidth = `${12 * barCount}px`;

  return (
    <div className="flex h-[100px] items-center justify-center gap-[6px]">
      {active ? (
        [...new Array(barCount)].map((_, index) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: only option for key
            key={index}
            className={`h-10 w-[6px] ${color} inline-block animate-bounce-wave rounded-sm`}
            style={{ animationDelay: `${-1.1 + index * 0.1}s` }}
          />
        ))
      ) : (
        <span className={`h-0.5 ${color}`} style={{ width: inactiveWidth }} />
      )}
    </div>
  );
};

export { SoundWave };
