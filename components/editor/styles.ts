export const EDITOR_STYLES = {
  container: "relative rounded-lg overflow-hidden group transition-all duration-300",
  background: [
    "absolute inset-0",
    "bg-gradient-to-br from-stone-900/95 via-stone-800/95 to-stone-800/95",
    "after:absolute after:inset-0",
    "after:bg-gradient-radial after:from-transparent after:to-black/10",
  ].join(" "),
  shadow: {
    base: [
      "absolute inset-0 transition-all duration-300",
      // Golden shadow with low opacity for subtlety
      "shadow-[inset_0_2px_15px_rgba(191,155,48,0.15)]",
      "after:absolute after:inset-0",
      // Subtle highlight at the top
      "after:shadow-[inset_0_1px_2px_rgba(191,155,48,0.05)]"
    ].join(" "),
    idle: [
      "shadow-[inset_0_2px_15px_rgba(191,155,48,0.15)]",
      "after:opacity-0"
    ].join(" "),
    focused: [
      // Deeper golden shadow when focused
      "shadow-[inset_0_3px_20px_rgba(191,155,48,0.25)]",
      "after:opacity-100"
    ].join(" "),
  },
  content: {
    wrapper: [
      "relative",
      // Subtle radial gradient for depth
      "bg-gradient-radial from-transparent to-[rgba(191,155,48,0.03)]"
    ].join(" "),
    hint: "absolute bottom-2 right-4 text-stone-400 text-sm"
  }
} as const;