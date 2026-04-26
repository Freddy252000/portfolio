import React, { useState } from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink, Shield, CheckCircle, Calendar, Hash } from "lucide-react";

interface Certificate {
    id: string;
    title: string;
    issuer: string;
    issuerLogo: string;
    issuedDate: string;
    credentialId: string;
    verifyUrl: string;
    description: string;
    skills: string[];
    color: {
        from: string;
        to: string;
        badge: string;
        skill: string;
        skillText: string;
        border: string;
        icon: string;
    };
}

const Certifications: React.FC = () => {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const certificates: Certificate[] = [
        {
            id: "1",
            title: "Frontend Developer Certification",
            issuer: "WorkLoo",
            issuerLogo: "WL",
            issuedDate: "April 2026",
            credentialId: "WL3A4MIL8K",
            verifyUrl: "https://workloo.com/verify/WL3A4MIL8K",
            description:
                "Earned with a 100% score at Professional level. Validates skills in modern frontend development including HTML, CSS, JavaScript, and responsive UI design principles.",
            skills: ["JavaScript", "CSS3", "HTML5", "Responsive Design", "UI Principles"],
            color: {
                from: "from-blue-50",
                to: "to-indigo-100",
                badge: "bg-blue-600",
                skill: "bg-blue-100 dark:bg-blue-900/50",
                skillText: "text-blue-700 dark:text-blue-300",
                border: "border-blue-200 dark:border-blue-800",
                icon: "text-blue-600 dark:text-blue-400",
            },
        },
        {
            id: "2",
            title: "Copado AI Certified Professional",
            issuer: "Copado",
            issuerLogo: "CP",
            issuedDate: "April 2026",
            credentialId: "064422",
            verifyUrl: "https://drive.google.com/file/d/11zdbKMC9AdUDUCdVgKjxFTMBL6skTWDZ/view?usp=drive_link",
            description:
                "Certified in AI-powered DevOps workflows, Copado AI Agents (Plan, Build, Test, Release, Operate), Org Intelligence, CI/CD automation, and modern Salesforce DevOps practices.",
            skills: ["DevOps", "Salesforce", "CI/CD", "AI Agents", "Org Intelligence"],
            color: {
                from: "from-purple-50",
                to: "to-violet-100",
                badge: "bg-purple-600",
                skill: "bg-purple-100 dark:bg-purple-900/50",
                skillText: "text-purple-700 dark:text-purple-300",
                border: "border-purple-200 dark:border-purple-800",
                icon: "text-purple-600 dark:text-purple-400",
            },
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
    };

    return (
        <section
            id="certifications"
            className="section-padding bg-secondary-50 dark:bg-secondary-800"
        >
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center justify-center mb-4">
                        <motion.div
                            className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-2xl mr-4"
                            whileHover={{ rotate: 10, scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Award size={32} className="text-primary-600 dark:text-primary-400" />
                        </motion.div>
                        <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white">
                            Certifications
                        </h2>
                    </div>
                    <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
                        Professional certifications that validate my skills and commitment to
                        continuous learning
                    </p>

                    {/* Stats strip */}
                    <motion.div
                        className="inline-flex items-center space-x-6 mt-6 px-6 py-3 bg-white dark:bg-secondary-900 rounded-2xl shadow-sm border border-secondary-200 dark:border-secondary-700"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center space-x-2">
                            <CheckCircle size={18} className="text-green-500" />
                            <span className="text-sm font-semibold text-secondary-700 dark:text-secondary-300">
                                {certificates.length} Certifications
                            </span>
                        </div>
                        <div className="w-px h-5 bg-secondary-200 dark:bg-secondary-700" />
                        <div className="flex items-center space-x-2">
                            <Shield size={18} className="text-primary-500" />
                            <span className="text-sm font-semibold text-secondary-700 dark:text-secondary-300">
                                Verified & Active
                            </span>
                        </div>
                        <div className="w-px h-5 bg-secondary-200 dark:bg-secondary-700" />
                        <div className="flex items-center space-x-2">
                            <Calendar size={18} className="text-orange-500" />
                            <span className="text-sm font-semibold text-secondary-700 dark:text-secondary-300">
                                Latest: April 2026
                            </span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Certificates Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {certificates.map((cert) => (
                        <motion.div
                            key={cert.id}
                            className={`relative bg-gradient-to-br ${cert.color.from} ${cert.color.to} dark:from-secondary-800 dark:to-secondary-900 rounded-2xl border ${cert.color.border} overflow-hidden cursor-pointer`}
                            variants={itemVariants}
                            whileHover={{ y: -8, scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            onHoverStart={() => setHoveredId(cert.id)}
                            onHoverEnd={() => setHoveredId(null)}
                        >
                            {/* Top accent bar */}
                            <div className={`h-1.5 w-full ${cert.color.badge}`} />

                            <div className="p-8">
                                {/* Header row */}
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center space-x-4">
                                        {/* Issuer logo */}
                                        <motion.div
                                            className={`w-14 h-14 ${cert.color.badge} rounded-2xl flex items-center justify-center shadow-lg`}
                                            whileHover={{ rotate: 5 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <span className="text-white font-bold text-lg tracking-tight">
                                                {cert.issuerLogo}
                                            </span>
                                        </motion.div>
                                        <div>
                                            <p className="text-sm font-semibold text-secondary-500 dark:text-secondary-400 uppercase tracking-widest">
                                                {cert.issuer}
                                            </p>
                                            <div className="flex items-center space-x-1 mt-0.5">
                                                <Calendar size={13} className="text-secondary-400" />
                                                <p className="text-xs text-secondary-400 dark:text-secondary-500">
                                                    Issued {cert.issuedDate}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Verified badge */}
                                    <motion.div
                                        className="flex items-center space-x-1 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-semibold border border-green-200 dark:border-green-800"
                                        animate={hoveredId === cert.id ? { scale: 1.05 } : { scale: 1 }}
                                    >
                                        <CheckCircle size={12} />
                                        <span>Verified</span>
                                    </motion.div>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-3 leading-snug">
                                    {cert.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-5 leading-relaxed">
                                    {cert.description}
                                </p>

                                {/* Skills */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {cert.skills.map((skill) => (
                                        <motion.span
                                            key={skill}
                                            className={`px-3 py-1 ${cert.color.skill} ${cert.color.skillText} rounded-full text-xs font-medium`}
                                            whileHover={{ scale: 1.08 }}
                                            transition={{ duration: 0.15 }}
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between pt-4 border-t border-secondary-200/70 dark:border-secondary-700">
                                    <div className="flex items-center space-x-1.5 text-secondary-500 dark:text-secondary-400">
                                        <Hash size={13} />
                                        <span className="text-xs font-mono font-medium">
                                            {cert.credentialId}
                                        </span>
                                    </div>

                                    <motion.a
                                        href={cert.verifyUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center space-x-2 px-4 py-2 ${cert.color.badge} text-white rounded-xl text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity duration-200 relative z-10`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <span>Verify</span>
                                        <ExternalLink size={14} />
                                    </motion.a>
                                </div>
                            </div>

                            {/* Decorative circle */}
                            <div
                                className={`absolute -bottom-8 -right-8 w-32 h-32 ${cert.color.badge} opacity-5 rounded-full`}
                            />
                            <div
                                className={`absolute -bottom-4 -right-4 w-20 h-20 ${cert.color.badge} opacity-5 rounded-full`}
                            />
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

export default Certifications;