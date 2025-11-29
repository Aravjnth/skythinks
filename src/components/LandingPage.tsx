import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, useMotionValue, useMotionTemplate, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
    Brain, ChevronRight, CheckCircle2,
    Target, TrendingUp,
    FileText, MessageSquare, Plus, Minus,
    Sparkles, Award, Clock, Shield, Zap, Star, X
} from 'lucide-react';

// --- Types ---


// --- Sub-Components ---

const Navbar = memo(() => {

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    };

    return (
        <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 100 }} className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/20 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex justify-between items-center">
                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
                    <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }} className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <Brain className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.div>
                    <span className="font-bold text-lg sm:text-xl tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Sky</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Thinks</span>
                    </span>
                </motion.div>
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                    {[
                        { label: "Features", id: "features" },
                        { label: "How it Works", id: "how-it-works" },
                        { label: "Testimonials", id: "testimonials" },
                        { label: "FAQ", id: "faq" }
                    ].map((item, i) => (
                        <motion.button
                            key={i}
                            onClick={() => scrollToSection(item.id)}
                            whileHover={{ scale: 1.1, color: "#fff", y: -2 }}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * i }}
                            className="hover:text-white transition-colors relative bg-transparent border-none cursor-pointer"
                        >
                            {item.label}
                            <motion.div
                                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"
                                initial={{ scaleX: 0 }}
                                whileHover={{ scaleX: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.button>
                    ))}
                </div>
            </div>
        </motion.nav>
    );
});

const Hero = memo(({ scrollYProgress, onJoinClick }: { scrollYProgress: any; onJoinClick: () => void }) => {
    const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const opacityFade = useTransform(scrollYProgress, [0, 0.3], [1, 0.7]);

    return (
        <section className="px-4 sm:px-6 mb-16 sm:mb-24 md:mb-32">
            <div className="max-w-5xl w-full mx-auto text-center relative">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs sm:text-sm font-medium mb-6 sm:mb-8">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    <span className="hidden sm:inline">Production Launch Coming Soon • Limited Early Access</span>
                    <span className="sm:hidden">Limited Early Access</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 sm:mb-8 leading-tight px-2 sm:px-0"
                    style={{ y: yParallax, opacity: opacityFade }}
                >
                    <motion.span
                        className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-slate-400"
                        animate={{ opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        {"Let AI Design".split("").map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.03 }}
                            >
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))}
                    </motion.span>
                    <motion.span
                        className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
                        animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{ duration: 5, repeat: Infinity }}
                        style={{ backgroundSize: "200% 200%" }}
                    >
                        {"Your Career Journey".split("").map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 + i * 0.03 }}
                            >
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))}
                    </motion.span>
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-base sm:text-lg md:text-xl text-slate-400 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
                    Our platform supports your entire academic timeline — from early exploration to final-year placement — with AI-driven roadmaps and Face ID-authenticated interview simulations.
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="max-w-md mx-auto w-full relative mb-8 sm:mb-10 md:mb-12 px-2 sm:px-0">
                    <motion.button
                        onClick={onJoinClick}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-6 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        Get Early Access
                        <ChevronRight size={20} />
                    </motion.button>
                </motion.div>

                <Stats />
            </div>
        </section>
    );
});

const Stats = memo(() => {
    const [userCount, setUserCount] = useState<number>(0);

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/count`);
                const data = await res.json();
                setUserCount(data.count || 0);
            } catch (err) {
                console.error("Failed to fetch stats", err);
            }
        };
        fetchCount();
        // Poll every 10 seconds to keep it updated
        const interval = setInterval(fetchCount, 10000);
        return () => clearInterval(interval);
    }, []);

    const displayCount = (2000 + userCount).toLocaleString();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, staggerChildren: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 border-y border-white/5 py-6 sm:py-8"
        >
            {[{ label: "Students Joined", value: `${displayCount}+`, icon: Star }, { label: "Mock Interviews", value: "50k", icon: Target }, { label: "Placement Rate", value: "94%", icon: TrendingUp }, { label: "Roadmaps", value: "12k", icon: Zap }].map((stat, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ delay: 0.6 + i * 0.1, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.15, y: -8, rotateY: 5 }}
                    className="cursor-default relative group"
                >
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="relative">
                        <div className="mx-auto w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2 text-indigo-400 opacity-50 group-hover:opacity-100 transition-opacity">
                            <stat.icon className="w-full h-full" />
                        </div>
                        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">
                            {stat.value}
                        </div>
                        <motion.div
                            className="text-xs sm:text-sm text-slate-500 uppercase tracking-wider"
                            whileHover={{ color: "#a5b4fc" }}
                        >
                            {stat.label}
                        </motion.div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
});

const Benefits = memo(() => {
    const benefits = [
        { icon: Clock, title: "Year-Adaptive Learning", desc: "Custom paths for 1st-year exploration to 4th-year placement prep." },
        { icon: Award, title: "AI HR Interviews", desc: "Realistic video-based HR rounds tailored to your specific job role." },
        { icon: TrendingUp, title: "Smart Job Matching", desc: "Integrated with LinkedIn & Naukri to find roles matching your skills." },
        { icon: Shield, title: "Face ID Security", desc: "Enterprise-grade authentication ensures your profile data is secure." }
    ];

    return (
        <section className="px-4 sm:px-6 py-12 sm:py-16 md:py-20 bg-white/[0.02] relative overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px]" />
            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-10 sm:mb-12 md:mb-16"
                >
                    <motion.h2
                        className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6 px-2"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Why Students Choose SkyThinks
                    </motion.h2>
                    <motion.p
                        className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        A complete ecosystem from skill building to your first offer letter
                    </motion.p>
                </motion.div>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.15
                            }
                        }
                    }}
                >
                    {benefits.map((benefit, i) => (
                        <motion.div
                            key={i}
                            variants={{
                                hidden: { opacity: 0, y: 50, rotateX: -15 },
                                visible: { opacity: 1, y: 0, rotateX: 0 }
                            }}
                            whileHover={{ y: -15, scale: 1.05, rotateY: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-indigo-500/30 transition-all group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/5 group-hover:to-pink-500/10 transition-all duration-300" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors duration-200">
                                    <benefit.icon className="text-indigo-400 w-6 h-6" />
                                </div>
                                <motion.h3
                                    className="text-xl font-bold mb-2"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {benefit.title}
                                </motion.h3>
                                <motion.p
                                    className="text-slate-400 text-sm"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    {benefit.desc}
                                </motion.p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
});

const Features = memo(() => {
    const features = [
        { icon: FileText, title: "Smart Profile Builder", desc: "Comprehensive profiling including academic details, gov ID proof, and Face ID authentication for a verified professional identity.", color: "from-blue-500 to-cyan-500" },
        { icon: Target, title: "Dynamic Roadmaps", desc: "3rd-year students get tailored paths: Start from basics, Fast-track for experienced, or Career discovery for the unsure.", color: "from-purple-500 to-pink-500" },
        { icon: MessageSquare, title: "AI Video Interviews", desc: "Final step AI-based HR interview via video conference, tailored specifically to your chosen job role and skill level.", color: "from-orange-500 to-red-500" },
        { icon: TrendingUp, title: "Placement Ecosystem", desc: "From aptitude tests to technical mocks and real-time job suggestions from LinkedIn & Naukri. We cover it all.", color: "from-green-500 to-emerald-500" }
    ];

    return (
        <section id="features" className="px-4 sm:px-6 py-12 sm:py-16 md:py-20 relative">
            <div className="max-w-7xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 sm:mb-16 md:mb-20">
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6 px-2">Complete Career Lifecycle</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4">A structured 13-step journey designed to take you from student to hired professional.</p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {features.map((feature, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 30, rotateX: -15 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: i * 0.15, duration: 0.6, type: "spring" }} whileHover={{ scale: 1.03, y: -5 }} className="group relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/[0.07] hover:border-indigo-500/30 transition-all cursor-pointer">
                            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${feature.color} opacity-10 blur-[60px] group-hover:opacity-20 transition-opacity duration-500`}></div>
                            <div className="relative z-10">
                                <motion.div whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }} transition={{ duration: 0.5 }} className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 sm:mb-6 shadow-lg`}>
                                    <feature.icon className="text-white w-6 h-6 sm:w-7 sm:h-7" />
                                </motion.div>
                                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">{feature.title}</h3>
                                <p className="text-slate-400 leading-relaxed text-sm sm:text-base">{feature.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
});

const HowItWorks = memo(() => (
    <section id="how-it-works" className="px-4 sm:px-6 py-12 sm:py-16 md:py-20 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 sm:mb-16 md:mb-20">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6 px-2">Your 4-Stage Journey</h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4">Our intelligent system adapts to your current academic year and career goals.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12 relative">
                <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500/0 via-indigo-500/50 to-indigo-500/0"></div>
                {[
                    { step: "01", title: "Profile & Verify", desc: "Register with Face ID. Enter academic details. Our system validates your identity and current standing." },
                    { step: "02", title: "Get Roadmap", desc: "1st/2nd years get domain exploration. 3rd years get custom paths (C1/C2/C3). 4th years get placement prep." },
                    { step: "03", title: "Skill & Mock", desc: "Follow the roadmap. Take skill assessments, aptitude tests, and full-stack technical mock exams." },
                    { step: "04", title: "AI Interview", desc: "The final frontier. Face our AI HR in a video interview tailored to your dream role. Get hired." }
                ].map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }} className="relative text-center">
                        <motion.div whileHover={{ scale: 1.1, rotate: 360 }} transition={{ duration: 0.6 }} className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-[#030712] border-4 border-indigo-500/20 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold text-indigo-400 mb-4 sm:mb-6 relative z-10">
                            {item.step}
                        </motion.div>
                        <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{item.title}</h3>
                        <p className="text-slate-400 text-sm sm:text-base">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
));

const TechStack = memo(() => {
    const techStack = [
        { name: "Face ID Auth", desc: "Secure biometric login" },
        { name: "AI Resume Parser", desc: "Deep learning profile analysis" },
        { name: "Video AI", desc: "Real-time interview analysis" },
        { name: "Job Aggregator", desc: "LinkedIn & Naukri integration" }
    ];

    return (
        <section className="px-6 py-20">
            <div className="max-w-7xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 sm:mb-12 md:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6 px-2">Powered by cutting-edge AI</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4">Built on the latest technology to deliver unparalleled career insights</p>
                </motion.div>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        visible: { transition: { staggerChildren: 0.12 } }
                    }}
                >
                    {techStack.map((tech, i) => (
                        <motion.div
                            key={i}
                            variants={{
                                hidden: { opacity: 0, scale: 0.5, rotateY: 90 },
                                visible: { opacity: 1, scale: 1, rotateY: 0 }
                            }}
                            whileHover={{ scale: 1.1, y: -10, rotateZ: 5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 text-center relative group overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 transition-colors duration-300" />
                            <div className="relative z-10">
                                <Sparkles className="w-8 h-8 text-indigo-400 mx-auto mb-4" />
                                <h3 className="font-bold text-base sm:text-lg mb-2">{tech.name}</h3>
                                <p className="text-slate-400 text-sm">{tech.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
});

const Testimonials = memo(() => {
    const testimonials = [
        { name: "Alex Johnson", role: "3rd Year CSE", company: "Placed at Google", image: "https://i.pravatar.cc/150?img=11", quote: "I was confused about what to study. The C3 path helped me discover my interest in AI, and the roadmap guided me step-by-step." },
        { name: "Priya Patel", role: "Final Year ECE", company: "Placed at TCS", image: "https://i.pravatar.cc/150?img=5", quote: "The AI HR interview was exactly like the real thing. It helped me overcome my nervousness and ace my campus placement." },
        { name: "Rahul Sharma", role: "2nd Year IT", company: "Intern at Amazon", image: "https://i.pravatar.cc/150?img=3", quote: "Starting early with the domain exploration feature gave me a huge head start over my peers. Highly recommend for 1st and 2nd years!" }
    ];

    return (
        <section id="testimonials" className="px-4 sm:px-6 py-12 sm:py-16 md:py-20 bg-white/[0.02]">
            <div className="max-w-7xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 sm:mb-12 md:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6 px-2">Loved by professionals worldwide</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4">See how SkyThinks has transformed careers across industries</p>
                </motion.div>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        visible: { transition: { staggerChildren: 0.2 } }
                    }}
                >
                    {testimonials.map((testimonial, i) => (
                        <motion.div
                            key={i}
                            variants={{
                                hidden: { opacity: 0, y: 50, scale: 0.9 },
                                visible: { opacity: 1, y: 0, scale: 1 }
                            }}
                            whileHover={{ y: -15, scale: 1.05, rotateY: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-indigo-500/20 transition-all relative group overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-xl opacity-50" />
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <motion.img
                                        whileHover={{ scale: 1.2, rotate: 10 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-14 h-14 rounded-full border-2 border-indigo-500/20 group-hover:border-indigo-500/50 transition-colors"
                                    />
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <motion.h4
                                            className="font-bold"
                                            whileHover={{ color: "#a5b4fc" }}
                                        >
                                            {testimonial.name}
                                        </motion.h4>
                                        <p className="text-sm text-slate-400">{testimonial.role}</p>
                                        <motion.p
                                            className="text-xs text-indigo-400"
                                            animate={{ opacity: [0.7, 1, 0.7] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            {testimonial.company}
                                        </motion.p>
                                    </motion.div>
                                </div>
                                <motion.p
                                    className="text-slate-300 leading-relaxed italic"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    "{testimonial.quote}"
                                </motion.p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
});

const FAQ = memo(() => {
    const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
    const faqs = [
        { q: "How does the roadmap differ for 1st vs 3rd year students?", a: "For 1st and 2nd years, we focus on domain exploration and foundational skills (DSA, soft skills). For 3rd years, we offer 3 specific paths: C1 (Basics), C2 (Fast-track), and C3 (Discovery), depending on your current knowledge and confidence." },
        { q: "What is the Face ID authentication for?", a: "We use Face ID scanning during registration and login to ensure the security and authenticity of every user profile. This prevents fake accounts and ensures a trusted community for recruiters." },
        { q: "How does the AI HR Interview work?", a: "Our system conducts a final mock interview via video conference. An AI avatar acts as the HR, asking behavioral and technical questions tailored to your target role. It analyzes your answers, body language, and confidence in real-time." },
        { q: "Does it really find jobs for me?", a: "Yes! While you prepare for aptitude and technical rounds, our system actively scans LinkedIn, Naukri, and other platforms to suggest relevant job postings that match your prepared skill set." },
        { q: "I'm not from a CS background, can I use this?", a: "Absolutely. Our domain recommendations are based on your specific department. Whether you are ECE, Mechanical, or Arts, the system suggests top industry domains relevant to your field." },
        { q: "Is the roadmap static or dynamic?", a: "It is completely dynamic. As you complete steps, take mock tests, and improve your skills, the roadmap adjusts to keep you challenged and on the fastest path to employment." }
    ];

    return (
        <section id="faq" className="px-4 sm:px-6 py-12 sm:py-16 md:py-20">
            <div className="max-w-3xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 sm:mb-12 md:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6 px-2">Frequently Asked Questions</h2>
                    <p className="text-slate-400 text-sm sm:text-base md:text-lg px-4">Everything you need to know about SkyThinks</p>
                </motion.div>
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="border border-white/10 rounded-xl sm:rounded-2xl bg-white/5 overflow-hidden">
                            <motion.button whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }} onClick={() => setActiveAccordion(activeAccordion === i ? null : i)} className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between text-left transition-colors">
                                <span className="font-medium text-base sm:text-lg pr-4">{faq.q}</span>
                                <motion.div animate={{ rotate: activeAccordion === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                                    {activeAccordion === i ? <Minus size={20} className="text-indigo-400 flex-shrink-0" /> : <Plus size={20} className="text-slate-400 flex-shrink-0" />}
                                </motion.div>
                            </motion.button>
                            <AnimatePresence>
                                {activeAccordion === i && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                                        <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-slate-400 leading-relaxed text-sm sm:text-base">{faq.a}</div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
});

const WaitlistModal = memo(({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        academicYear: '',
        department: '',
        domain: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/join`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                    onClose();
                    setFormData({ name: '', email: '', phone: '', academicYear: '', department: '', domain: '' });
                }, 3000);
            } else {
                const data = await response.json();
                alert(data.error || 'Something went wrong');
            }
        } catch (error) {
            alert('Failed to connect to server');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
                    >
                        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                            <X size={24} />
                        </button>

                        {isSuccess ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle2 className="text-green-500 w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">You're on the list!</h3>
                                <p className="text-slate-400">We'll be in touch soon.</p>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-2xl font-bold text-white mb-6">Join the Waitlist</h3>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-1">Full Name</label>
                                        <input required name="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500" placeholder="John Doe" />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                                            <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500" placeholder="john@example.com" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-400 mb-1">Phone Number</label>
                                            <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500" placeholder="+1 234 567 8900" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-400 mb-1">Academic Year</label>
                                            <select required name="academicYear" value={formData.academicYear} onChange={handleChange} className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500">
                                                <option value="">Select Year</option>
                                                <option value="1st Year">1st Year</option>
                                                <option value="2nd Year">2nd Year</option>
                                                <option value="3rd Year">3rd Year</option>
                                                <option value="4th Year">4th Year</option>
                                                <option value="Graduated">Graduated</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-400 mb-1">Department</label>
                                            <input required name="department" value={formData.department} onChange={handleChange} className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500" placeholder="CSE, ECE, etc." />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-1">Interested Domain</label>
                                        <input required name="domain" value={formData.domain} onChange={handleChange} className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500" placeholder="AI/ML, Web Dev, Cyber Security..." />
                                    </div>
                                    <button disabled={isSubmitting} type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-indigo-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2">
                                        {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                                    </button>
                                </form>
                            </>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
});

const CTA = memo(({ onJoinClick }: { onJoinClick: () => void }) => (
    <section className="px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="max-w-5xl mx-auto relative rounded-2xl sm:rounded-[2.5rem] overflow-hidden">
            <motion.div animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }} transition={{ duration: 10, repeat: Infinity }} className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700"></motion.div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="relative z-10 px-6 sm:px-8 py-12 sm:py-16 md:py-20 text-center">
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6">Ready to accelerate your career?</motion.h2>
                <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-indigo-100 text-sm sm:text-base md:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto px-2">
                    Join thousands of professionals who are already using SkyThinks to land their dream jobs. Limited early access spots available.
                </motion.p>
                <motion.button onClick={onJoinClick} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white text-indigo-600 font-bold text-base sm:text-lg hover:bg-indigo-50 transition-colors shadow-xl">
                    Join the Waitlist Now
                </motion.button>
                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-indigo-200 text-xs sm:text-sm mt-4 sm:mt-6 px-4">🎁 Early access members get lifetime 40% discount</motion.p>
            </div>
        </motion.div>
    </section>
));

const footerData: Record<string, { title: string; content: string }> = {
    "Features": {
        title: "Features",
        content: "Our platform offers a comprehensive suite of AI-powered tools including Smart Resume Builder, Mock Interview AI, Job Matching Engine, and personalized Career Roadmaps. Each feature is designed to give you a competitive edge in the job market."
    },
    "Pricing": {
        title: "Pricing",
        content: "We offer flexible pricing tiers to suit every need. Start with our Free tier for basic features, or upgrade to Pro for unlimited AI interviews and advanced analytics. Enterprise solutions are available for educational institutions and organizations."
    },
    "Enterprise": {
        title: "Enterprise Solutions",
        content: "Partner with us to empower your students or employees. Our enterprise dashboard provides aggregate insights, bulk license management, and custom integration options for universities and placement cells."
    },
    "Success Stories": {
        title: "Success Stories",
        content: "Read how thousands of students and professionals have transformed their careers using SkyThinks. From landing FAANG jobs to successful career pivots, our users' success is our greatest achievement."
    },
    "API Access": {
        title: "API Access",
        content: "Integrate our powerful career AI models into your own applications. Our robust API provides access to resume parsing, skill gap analysis, and job matching algorithms with enterprise-grade security."
    },
    "About Us": {
        title: "About Us",
        content: "SkyThinks is on a mission to democratize career success. Founded by industry veterans and AI researchers, we believe everyone deserves a personalized career coach to guide them through their professional journey."
    },
    "Careers": {
        title: "Careers at SkyThinks",
        content: "Join our fast-growing team of dreamers and doers. We're looking for passionate individuals in Engineering, Product, Design, and Marketing who want to make a real impact on people's lives."
    },
    "Blog": {
        title: "Blog",
        content: "Stay updated with the latest trends in career development, AI technology, and job market insights. Our blog features expert advice, industry reports, and tips for career advancement."
    },
    "Contact": {
        title: "Contact Us",
        content: "Have questions or need support? Reach out to our team at skythinkss@gmail.com. We're here to help you succeed."
    },
    "Press Kit": {
        title: "Press Kit",
        content: "Download our official brand assets, logos, and executive bios. For media inquiries, please contact skythinkss@gmail.com."
    }
};

const InfoModal = memo(({ isOpen, onClose, title, content }: { isOpen: boolean; onClose: () => void; title: string; content: string }) => (
    <AnimatePresence>
        {isOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl"
                >
                    <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                    <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
                    <p className="text-slate-300 leading-relaxed">{content}</p>
                </motion.div>
            </div>
        )}
    </AnimatePresence>
));

const Footer = memo(() => {
    const [modalInfo, setModalInfo] = useState<{ isOpen: boolean; title: string; content: string }>({ isOpen: false, title: '', content: '' });

    const handleItemClick = (item: string) => {
        const data = footerData[item];
        if (data) {
            setModalInfo({ isOpen: true, title: data.title, content: data.content });
        }
    };

    return (
        <>
            <footer className="relative z-10 border-t border-white/5 bg-black/40 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-10 md:mb-12">
                        <div className="col-span-1 md:col-span-2">
                            <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-2 mb-6">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                    <Brain className="text-white w-5 h-5" />
                                </div>
                                <span className="font-bold text-xl tracking-tight">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Sky</span>
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Thinks</span>
                                </span>
                            </motion.div>
                            <p className="text-slate-400 max-w-sm mb-4 sm:mb-6 text-sm sm:text-base">Empowering professionals with AI-driven insights to build meaningful and successful careers. Your personalized career coach, available 24/7.</p>
                            <div className="flex flex-wrap gap-2 sm:gap-4">
                                <div className="px-3 py-1 rounded-full bg-white/5 text-xs text-slate-400">SOC 2 Certified</div>
                                <div className="px-3 py-1 rounded-full bg-white/5 text-xs text-slate-400">GDPR Compliant</div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Product</h4>
                            <ul className="space-y-2 text-slate-400">
                                {["Features", "Pricing", "Enterprise", "Success Stories", "API Access"].map((item, i) => (
                                    <motion.li
                                        key={i}
                                        whileHover={{ x: 5, color: "#fff" }}
                                        onClick={() => handleItemClick(item)}
                                        className="cursor-pointer hover:text-white transition-colors"
                                    >
                                        {item}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Company</h4>
                            <ul className="space-y-2 text-slate-400">
                                {["About Us", "Careers", "Blog", "Contact", "Press Kit"].map((item, i) => (
                                    <motion.li
                                        key={i}
                                        whileHover={{ x: 5, color: "#fff" }}
                                        onClick={() => handleItemClick(item)}
                                        className="cursor-pointer hover:text-white transition-colors"
                                    >
                                        {item}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="pt-6 sm:pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
                        <p className="text-slate-500 text-sm">© 2025 Shentinelix Sphere Pvt Ltd. All rights reserved.</p>
                        <div className="flex gap-6 text-slate-500">
                            {[0, 1, 2].map((i) => (
                                <motion.a key={i} href="#" whileHover={{ scale: 1.2, color: "#fff" }} className="hover:text-white transition-colors">
                                    <span className="sr-only">Social</span>
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
            <InfoModal isOpen={modalInfo.isOpen} onClose={() => setModalInfo({ ...modalInfo, isOpen: false })} title={modalInfo.title} content={modalInfo.content} />
        </>
    );
});

// --- Main Component ---

const LandingPage: React.FC = () => {
    const [showWaitlistModal, setShowWaitlistModal] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (window.innerWidth > 768) { // Only on desktop
                mouseX.set(e.clientX);
                mouseY.set(e.clientY);
            }
        };
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    const backgroundStyle = useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(99, 102, 241, 0.15), transparent 80%)`;

    return (
        <div ref={containerRef} className="min-h-screen bg-[#030712] text-white overflow-hidden relative selection:bg-indigo-500/30 font-sans">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <motion.div className="absolute inset-0 opacity-100 transition-opacity duration-300" style={{ background: backgroundStyle }} />
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[80px] mix-blend-screen"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[80px] mix-blend-screen"></div>
                {/* Floating Particles */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-indigo-400/20 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            willChange: 'transform, opacity'
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.1, 0.4, 0.1],
                        }}
                        transition={{
                            duration: 5 + Math.random() * 3,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            <Navbar />

            <main className="relative z-10 pt-20 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
                <Hero scrollYProgress={scrollYProgress} onJoinClick={() => setShowWaitlistModal(true)} />
                <Benefits />
                <Features />
                <HowItWorks />
                <TechStack />
                <Testimonials />
                <FAQ />
                <CTA onJoinClick={() => setShowWaitlistModal(true)} />
            </main>

            <Footer />
            <WaitlistModal isOpen={showWaitlistModal} onClose={() => setShowWaitlistModal(false)} />
        </div>
    );
};

export default LandingPage;
