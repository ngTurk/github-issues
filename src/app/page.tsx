import IssueItem from "@/components/issues/issue-item";

export default function Home() {
  const items = new Array(10).fill(2);

  return (
    <section className="container mx-auto pt-10">
      {items.map((value, i) => (
        <IssueItem itemIndex={i} itemsLength={items.length} key={i} />
      ))}
    </section>
  );
}
