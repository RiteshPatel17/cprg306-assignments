import Link from "next/link";

export default function StudentInfo() {
  return (
    <section>
      <p>Your Name: Ritesh Patel</p>
      <p>
        GitHub Repository:{" "}
        <Link href="https://github.com/RiteshPatel17/cprg306-assignments">
          My GitHub Repository
        </Link>
      </p>
    </section>
  );
}