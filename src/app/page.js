import Image from "next/image";

export default function Home() {
  return (
    <div>
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-white shadow-md">
        <div className="flex items-center">
          <Image src="/logo.png" alt="PennyWise Logo" className="mr-2" width={48} height={48} />
          <h1 className="text-xl font-bold text-red-600">PennyWise</h1>
        </div>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600">Login</button>
      </header>

      {/* Hero Section */}
      <section
        className="relative flex md:p-[10%] h-full md:flex-row-reverse md:gap-8 gap-2 flex-col text-center py-20 px-6 text-white"
        style={{
          background: "linear-gradient(174.48deg, #FDFB74 -12.41%, #C81A1D 88.56%)",
        }}
      >
        <div className="relative w-1/3 aspect-square">
          <Image src="/hero.png" alt="Hero" fill />
        </div>
        <div className="w-2/3 flex flex-col text-start justify-center">
          <h2 className="md:text-7xl text-4xl mb-4">
            Spend and Save your <br /> <span className="font-bold">Penny Wisely</span> with us!
          </h2>
          <p className="text-lg mb-6 text-justify">
            PennyWise is a smart, user-friendly <span className="font-bold">expense and income tracker</span> designed
            to optimize every penny. Manage budgets, track expenses, and achieve financial goals with insightful tools,
            <span className="font-bold">empowering you to save more effortlessly.</span>
          </p>
          <button className="bg-white w-fit text-orange-500 px-6 py-2 rounded-lg font-medium hover:bg-gray-100">
            Discover
          </button>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="flex md:px-[15%] flex-wrap items-center justify-center gap-10 p-10 bg-white">
        <div className="relative w-80 aspect-square">
          <Image src="/welcome.png" alt="Illustration" className="w-80" fill />
        </div>
        <div className="max-w-md flex flex-col gap-2">
          <h3 className="text-3xl font-semibold text-red-600">Welcome to PennyWise</h3>
          <div className="h-1 w-5 bg-red-600 mb-4 rounded-full" />
          <p className="text-gray-700 mb-6">
            Choose PennyWise for a seamless, user-focused experience in managing your finances. Our platform is built to
            make expense tracking simple, accurate, and insightful, helping you gain full control over every penny. With
            smart budgeting tools, personalized reports, and secure data handling, we empower you to achieve financial
            wellness easily.
          </p>
          <button className="bg-orange-500 w-fit rounded-full text-white px-4 py-2 font-medium hover:bg-orange-600">
            I Am Interested
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="py-20 px-6 bg-white text-center flex items-center justify-center"
        style={{
          background: "linear-gradient(174.48deg, #FDFB74 -12.41%, #C81A1D 88.56%)",
        }}
      >
        <div className="bg-white rounded-lg py-4 px-16 w-3/4">
          <h3 className="text-3xl font-bold text-orange-500 mb-10">Our Beloved Features</h3>
          <div className="flex flex-wrap justify-center gap-10">
            {/* Feature 1 */}
            <div className="flex flex-col items-center justify-center gap-2">
              <Image src="/clarity_form.png" width={100} height={100} alt="Clarity From" />
              <h4 className="text-xl font-bold text-orange-600">Intuitive Daily Form</h4>
              <p className=" max-w-80 text-gray-700">
                Input your daily income and expenses easily here! Directly access your previous transactions to have a
                more transparent financial management.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="flex flex-col items-center justify-center gap-2">
              <Image src="/fluent_mdl.png" width={100} height={100} alt="Fluent MDL" />
              <h4 className="text-xl font-bold text-orange-600">Personalized Dashboard</h4>
              <p className=" max-w-80 text-gray-700">
                Dashboard made personally for you to observe your personal transaction trends! This includes
                categorization, making it easier to track.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="flex flex-col items-center justify-center gap-2">
              <Image src="/fluent_savings.png" width={100} height={100} alt="Fluent Savings" />
              <h4 className="text-xl font-bold text-orange-600">Savings Goal Support</h4>
              <p className=" max-w-80 text-gray-700">
                We want you to achieve your wildest dreams! Track your progress in achieving that dream through this
                feature!
              </p>
            </div>
          </div>
          <button className="mt-10 bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}
