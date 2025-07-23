import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cortex CV - Smart Resume Analysis" },
    { name: "description", content: "Transform your career with AI-powered resume feedback and smart insights!" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "theme-color", content: "#667eea" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      try {
        const resumes = (await kv.list('resume:*', true)) as KVItem[];
        const parsedResumes = resumes?.map((resume) => (
          JSON.parse(resume.value) as Resume
        ));

        setResumes(parsedResumes || []);
      } catch (error) {
        console.error('Error loading resumes:', error);
        setResumes([]);
      } finally {
        setLoadingResumes(false);
        setIsVisible(true);
      }
    };

    loadResumes();
  }, []);

  const LoadingAnimation = () => (
    <div className="flex flex-col items-center justify-center space-y-8 py-16">
      <div className="relative">
        <div className="w-32 h-32 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-32 h-32 border-4 border-transparent border-t-blue-400 rounded-full animate-spin animate-reverse" 
             style={{ animationDelay: '0.1s', animationDuration: '0.8s' }}></div>
      </div>
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-semibold text-gradient animate-pulse">
          Loading Your Resumes
        </h3>
        <p className="text-gray-600 max-w-md">
          We're gathering your resume analytics and feedback data...
        </p>
      </div>
      <div className="flex space-x-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.1}s` }}
          ></div>
        ))}
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-20 space-y-8 max-w-2xl mx-auto">
      <div className="relative">
        <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center shadow-xl">
          <svg className="w-16 h-16 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-sm">+</span>
        </div>
      </div>
      
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gradient">
          Start Your Career Journey
        </h2>
        <p className="text-xl text-gray-600 leading-relaxed">
          Upload your first resume to get AI-powered insights, ATS compatibility scores, 
          and personalized recommendations that will help you land your dream job.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Link 
          to="/upload" 
          className="primary-button text-xl font-semibold flex items-center gap-3 group"
        >
          <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" 
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          Upload Your Resume
        </Link>
        
        <button className="text-purple-600 hover:text-purple-800 font-medium flex items-center gap-2 transition-colors duration-300">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          How it works
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full">
        {[
          { icon: "🤖", title: "AI Analysis", desc: "Advanced algorithms analyze your resume" },
          { icon: "📊", title: "ATS Score", desc: "Check compatibility with hiring systems" },
          { icon: "💡", title: "Smart Tips", desc: "Get personalized improvement suggestions" }
        ].map((feature, index) => (
          <div key={index} 
               className="glass-effect rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300"
               style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="font-semibold text-lg mb-2 text-dark-400">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const StatsHeader = () => {
    if (resumes.length === 0) return null;

    const avgScore = Math.round(
      resumes.reduce((sum, resume) => sum + resume.feedback.overallScore, 0) / resumes.length
    );
    
    const highestScore = Math.max(...resumes.map(r => r.feedback.overallScore));
    const totalApplications = resumes.length;

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-12">
        {[
          { label: "Average Score", value: avgScore, suffix: "/100", color: "from-green-400 to-green-600" },
          { label: "Highest Score", value: highestScore, suffix: "/100", color: "from-blue-400 to-blue-600" },
          { label: "Total Applications", value: totalApplications, suffix: "", color: "from-purple-400 to-purple-600" }
        ].map((stat, index) => (
          <div key={index} 
               className="glass-effect rounded-3xl p-6 text-center hover:scale-105 transition-all duration-300"
               style={{ animationDelay: `${index * 0.1}s` }}>
            <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
              {stat.value}{stat.suffix}
            </div>
            <div className="text-gray-600 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover bg-fixed relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <Navbar />

      <section className={`main-section transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="page-heading py-20">
          <h1 className="mb-6">
            Track Your Applications & Resume Ratings
          </h1>
          {loadingResumes ? (
            <h2 className="animate-pulse">Analyzing your resume portfolio...</h2>
          ) : resumes?.length === 0 ? (
            <h2 className="max-w-4xl leading-relaxed">
              Transform your career prospects with AI-powered resume analysis and personalized feedback.
            </h2>
          ) : (
            <h2 className="max-w-4xl leading-relaxed">
              Your resume analytics dashboard - track performance, monitor improvements, and optimize for success.
            </h2>
          )}
        </div>

        {loadingResumes && <LoadingAnimation />}

        {!loadingResumes && resumes?.length === 0 && <EmptyState />}

        {!loadingResumes && resumes.length > 0 && (
          <>
            <StatsHeader />
            
            <div className="w-full max-w-7xl">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-dark-400">Your Resume Portfolio</h3>
                <Link 
                  to="/upload" 
                  className="flex items-center gap-2 px-6 py-3 glass-effect rounded-full 
                           hover:scale-105 transition-all duration-300 text-purple-600 
                           font-medium border border-purple-200/50 hover:border-purple-300/80"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add New Resume
                </Link>
              </div>
              
              <div className="resumes-section">
                {resumes.map((resume, index) => (
                  <div 
                    key={resume.id}
                    style={{ '--card-index': index } as React.CSSProperties}
                    className="resume-card"
                  >
                    <ResumeCard resume={resume} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </section>

      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-reverse {
          animation-direction: reverse;
        }
      `}</style>
    </main>
  );
}