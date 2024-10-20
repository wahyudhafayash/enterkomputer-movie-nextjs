import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen w-full pt-16 justify-center items-center">
      <SignUp />
    </div>
  );
}
