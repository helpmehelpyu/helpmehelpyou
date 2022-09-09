import Link from 'next/link';
import { useRouter } from 'next/router';

export default function RedirectConfirmation() {
  const router = useRouter();
  const { url } = router.query;
  const encodedUrl = url as string;
  const decodedUrl = decodeURIComponent(encodedUrl);

  return (
    <div className="flex flex-col h-screen w-screen text-center">
      <div className="m-auto space-y-5">
        <h1 className="font-black text-8xl">Wait !</h1>
        <h1 className="text-center text-2xl">
          You are about to leave HelpMeHelpYou and go to{' '}
          <span className="text-red-600">&quot;{decodedUrl}&quot;</span>
        </h1>
        <h2 className="text-xl">
          That could be a potentially malicious site. Are you sure you want to
          go there?
        </h2>
        <div className="flex justify-center items-center gap-16 flex-wrap w-full pt-10">
          <Link href={decodedUrl}>
            <button className="font-bold border-2 border-cyan-600 text-cyan-600 hover:bg-gray-200 p-4 rounded text-4xl">
              Yes
            </button>
          </Link>
          <button
            className="font-bold border-2 border-red-600 text-red-600 hover:bg-gray-200 p-4 rounded text-4xl"
            onClick={() => {
              history.back();
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
