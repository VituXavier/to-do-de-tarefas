import FooterInterface from "@/components/common/FooterInterface";
import Header from "@/components/common/Header";
import TaskList from "@/components/common/TaskList";
import { Card } from "@/components/ui/card";

export default function HomePage() {
  return (
    <>
      <Card className="max-w-[80rem] mx-auto p-4 mt-6">
        <Header />
        <TaskList />
        <FooterInterface />
      </Card>
    </>
  );
}
