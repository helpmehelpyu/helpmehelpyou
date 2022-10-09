import Navbar from './navbar';
interface Props {
  children?: JSX.Element | JSX.Element[];
}

export default function NavbarLayout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen min-w-min">
      <Navbar></Navbar>
      <main className="flex justify-center items-center flex-grow min-w-min">
        {children}
      </main>
    </div>
  );
}
