export default function Header() {
  return (
    <header className="mb-8">
      <Title />    
    </header>
  );
}

const Title = () => {
  return <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center lg:text-left">Github Repository Search</h1>;
};
