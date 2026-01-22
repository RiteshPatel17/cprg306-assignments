import Link from "next/link";

export default function StudentInfo() {
  return (
    <section>
      <p>Your Name: Ritesh Patel</p>
      <p>
        GitHub Repository:{" "}
        <Link href="https://github.com/RiteshPatel17/cprg306-assignments">
          https://github.com/RiteshPatel17/cprg306-assignments
        </Link>
      </p>
    </section>
  );
}