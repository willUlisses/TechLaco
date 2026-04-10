import { Header } from "../components/section/Header";
import { PageHeader } from "../components/section/PageHeader";
import { FreelancerList } from "../components/section/FreelancerList";
import { Sidebar } from "../components/section/Sidebar";

export function BuscarFreelancers() {
  return (
    <>
      <Header />
      <PageHeader />
      <main className="container main-content">
        <FreelancerList />
        <Sidebar />
      </main>
    </>
  );
}