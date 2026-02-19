// This component defines a simple logo icon with two vertical bars and a horizontal bar that animates on hover.

export const LogoIcon = () => {
  return (
    <div className="relative flex items-center justify-center gap-1.5">
      <div className="w-2.5 h-10 bg-foreground rounded-[1px] transition-transform group-hover:scale-105" />
      <div className="w-2.5 h-10 bg-foreground rounded-[1px] transition-transform group-hover:scale-105" />
      <div className="absolute top-[35%] w-11 h-2 bg-primary rounded-[1px] transition-all group-hover:w-12" />
    </div>
  );
};
