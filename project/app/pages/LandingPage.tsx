import { signIn } from "next-auth/react";

export function LandingPage() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Navigation */}
        <nav className="py-6 px-4 sm:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <svg className="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-2xl font-bold text-indigo-700">ExpenseTracker</span>
            </div>
            <button
              onClick={() => signIn("google")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </button>
          </div>
        </nav>
  
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Take Control of Your <span className="text-indigo-600">Finances</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600">
                Effortlessly track expenses, analyze spending patterns, and achieve your financial goals with our intuitive platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => signIn("google")}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Get Started - It's Free
                </button>
                <button className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-3 rounded-lg text-lg font-medium transition-all duration-300">
                  Watch Demo
                </button>
              </div>
              <div className="flex items-center pt-6 space-x-2 text-gray-500">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((item) => (
                    <img 
                      key={item}
                      src={`https://randomuser.me/api/portraits/${item % 2 === 0 ? 'women' : 'men'}/${item+20}.jpg`}
                      className="w-10 h-10 rounded-full border-2 border-white"
                      alt="User"
                    />
                  ))}
                </div>
                <span>Join 10,000+ happy users</span>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white p-2 rounded-2xl shadow-xl">
                <img 
                  src="https://illustrations.popsy.co/amber/digital-nomad.svg" 
                  alt="Expense Tracking Dashboard" 
                  className="w-full h-auto rounded-xl"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg z-10 hidden lg:block">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-3 rounded-full">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">$1,250 saved</p>
                    <p className="text-sm text-gray-500">this month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
}
