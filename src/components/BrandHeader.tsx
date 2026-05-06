import Link from "next/link";

type BrandHeaderProps = {
  actions?: React.ReactNode;
  centered?: boolean;
};

export function BrandHeader({ actions, centered = true }: BrandHeaderProps) {
  return (
    <header className={centered ? "brandHeader brandHeaderCentered" : "brandHeader"}>
      <Link href="/" aria-label="回到商品頁">
        <img src="/logo.jpg" alt="Scrumptious" />
      </Link>
      {actions ? <div className="brandHeaderActions">{actions}</div> : null}
    </header>
  );
}