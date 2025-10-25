import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';

const KundaliMatching = () => {
    const [matchResult, setMatchResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [boy, setBoy] = useState({ day: '', month: '', year: '', hour: '', minute: '', second: '', place: '' });
    const [girl, setGirl] = useState({ day: '', month: '', year: '', hour: '', minute: '', second: '', place: '' });

    const handleGenerateKundliMatch = async (e) => {
        e.preventDefault();
        setLoading(true);

        const boyDob = `${boy.day}/${boy.month}/${boy.year}`;
        const boyTob = `${boy.hour}:${boy.minute}`;
        const girlDob = `${girl.day}/${girl.month}/${girl.year}`;
        const girlTob = `${girl.hour}:${girl.minute}`;

        const params = {
            boy_dob: boyDob,
            boy_tob: boyTob,
            girl_dob: girlDob,
            girl_tob: girlTob,
            boy_lat: "1",
            boy_lon: "1",
            boy_tz: "5.5",
            girl_lat: "1",
            girl_lon: "1",
            girl_tz: "5.5",
            lang: "en",
            api_key: "349e48af-b57e-58aa-ad9c-623f1ab5a5f7"
        };

        try {
            // 🔹 Call all APIs simultaneously
            const [dashakootRes, aggregateMatchRes, rajjuVedhaRes, papasamayaRes] = await Promise.all([
                axios.get("https://api.vedicastroapi.com/v3-json/matching/dashakoot", { params }),
                axios.get("https://api.vedicastroapi.com/v3-json/matching/aggregate-match", { params }),
                axios.get("https://api.vedicastroapi.com/v3-json/matching/rajju-vedha-details", { params }),
                axios.get("https://api.vedicastroapi.com/v3-json/matching/papasamaya-match", { params }),
            ]);

            // 🔹 Combine all responses
            const combinedData = {
                dashakoot: dashakootRes.data.response,
                aggregate: aggregateMatchRes.data.response,
                rajjuVedha: rajjuVedhaRes.data.response,
                papasamaya: papasamayaRes.data.response,
            };

            console.log("✅ Combined Match Result:", combinedData);

            // 🔹 Store combined result
            setMatchResult(combinedData);

            // 🔹 Reset form
            setBoy({ day: '', month: '', year: '', hour: '', minute: '', second: '', place: '' });
            setGirl({ day: '', month: '', year: '', hour: '', minute: '', second: '', place: '' });

        } catch (error) {
            console.error("❌ Failed to fetch matchmaking data:", error?.response?.data || error.message);
            setMatchResult(null);
        } finally {
            setLoading(false);
        }
    };

    const matchKeys = ["dina", "gana", "mahendra", "rajju", "rasi", "rasiathi", "sthree", "vasya", "vedha", "yoni"];

    return (
        <div className="min-h-screen p-4 md:p-8 mt-[4rem]" style={{ backgroundColor: 'hsl(var(--light-red-secondary))' }}>
            <motion.div className="container mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <Card className="shadow-2xl rounded-xl overflow-hidden border-2 border-primary-theme">
                    <CardHeader className="text-center p-8 bg-gradient-to-br from-red-400 via-pink-400 to-rose-300">
                        <CardTitle className="text-4xl font-bold text-white">Kundli Matching</CardTitle>
                        <CardDescription className="text-lg text-red-100 mt-2">
                            Discover your right match.
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleGenerateKundliMatch}>
                        <CardContent className="p-6 md:p-10 space-y-8 bg-white">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <FormSection title="Boy's Details" state={boy} setState={setBoy} />
                                <FormSection title="Girl's Details" state={girl} setState={setGirl} />
                            </div>
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button type="submit" className="w-full text-xl py-4 btn-primary-theme text-white font-semibold" size="lg">
                                    {loading ? "Generating..." : "Generate Matchmaking"}
                                </Button>
                            </motion.div>
                            <p className="text-center text-sm text-gray-600">
                                By generating Kundli, you agree to our <a href="/terms-of-service" className="text-primary-theme hover:underline">Terms of Service</a> and <a href="/privacy-policy" className="text-primary-theme hover:underline">Privacy Policy</a>.
                            </p>
                        </CardContent>
                    </form>
                </Card>

                {matchResult && (
                    <>
                        {/* Overall Match Summary */}
                        <motion.div className="mt-10 p-6 bg-white rounded-xl shadow-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}>
                            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Overall Match Summary</h2>
                            
                            {/* Score Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                                <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-lg border-2 border-green-200 text-center">
                                    <h3 className="text-lg font-semibold text-green-800 mb-2">Dashakoot Score</h3>
                                    <div className="text-3xl font-bold text-green-600">
                                        {matchResult?.dashakoot.score}/10
                                    </div>
                                    <p className="text-sm text-green-700 mt-2">Out of 10 Points</p>
                                </div>
                                
                                <div className="bg-gradient-to-br from-blue-50 to-cyan-100 p-6 rounded-lg border-2 border-blue-200 text-center">
                                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Overall Score</h3>
                                    <div className="text-3xl font-bold text-blue-600">
                                        {matchResult?.aggregate.score}/100
                                    </div>
                                    <p className="text-sm text-blue-700 mt-2">Compatibility Percentage</p>
                                </div>

                                <div className="bg-gradient-to-br from-purple-50 to-violet-100 p-6 rounded-lg border-2 border-purple-200 text-center">
                                    <h3 className="text-lg font-semibold text-purple-800 mb-2">Papasamaya Score</h3>
                                    <div className="text-3xl font-bold text-purple-600">
                                        {matchResult?.papasamaya.score}/10
                                    </div>
                                    <p className="text-sm text-purple-700 mt-2">Karma Compatibility</p>
                                </div>
                                
                                <div className="bg-gradient-to-br from-orange-50 to-amber-100 p-6 rounded-lg border-2 border-orange-200 text-center">
                                    <h3 className="text-lg font-semibold text-orange-800 mb-2">Match Status</h3>
                                    <div className={`text-xl font-bold ${
                                        matchResult?.aggregate.score >= 75 ? 'text-green-600' :
                                        matchResult?.aggregate.score >= 50 ? 'text-yellow-600' : 'text-red-600'
                                    }`}>
                                        {matchResult?.aggregate.score >= 75 ? 'Excellent Match' :
                                         matchResult?.aggregate.score >= 50 ? 'Good Match' : 'Needs Consideration'}
                                    </div>
                                    <p className="text-sm text-orange-700 mt-2">Based on Overall Analysis</p>
                                </div>
                            </div>

                            {/* Bot Responses */}
                            <div className="space-y-4">
                                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                    <h3 className="text-lg font-semibold text-green-800 mb-2">Dashakoot Analysis</h3>
                                    <p className="text-gray-700">{matchResult?.dashakoot.bot_response}</p>
                                </div>
                                
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Aggregate Analysis</h3>
                                    <p className="text-gray-700">{matchResult?.aggregate.bot_response}</p>
                                </div>

                                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                                    <h3 className="text-lg font-semibold text-purple-800 mb-2">Papasamaya Analysis</h3>
                                    <p className="text-gray-700">{matchResult?.papasamaya.bot_response}</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Rajju Vedha Dosha Analysis */}
                        <motion.div className="mt-10 p-6 bg-white rounded-xl shadow-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }}>
                            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Rajju & Vedha Dosha Analysis</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className={`p-6 rounded-lg border-2 text-center ${
                                    matchResult?.rajjuVedha.is_rajju_dosha_present 
                                        ? 'bg-red-50 border-red-300' 
                                        : 'bg-green-50 border-green-300'
                                }`}>
                                    <h3 className="text-xl font-semibold mb-3">Rajju Dosha</h3>
                                    <div className={`text-4xl font-bold mb-3 ${
                                        matchResult?.rajjuVedha.is_rajju_dosha_present ? 'text-red-600' : 'text-green-600'
                                    }`}>
                                        {matchResult?.rajjuVedha.is_rajju_dosha_present ? 'Present' : 'Absent'}
                                    </div>
                                    <p className="text-gray-600">
                                        {matchResult?.rajjuVedha.is_rajju_dosha_present 
                                            ? 'Rajju Dosha may affect longevity and marital harmony' 
                                            : 'No Rajju Dosha detected - favorable for marriage'}
                                    </p>
                                </div>

                                <div className={`p-6 rounded-lg border-2 text-center ${
                                    matchResult?.rajjuVedha.is_vedha_dosha_present 
                                        ? 'bg-red-50 border-red-300' 
                                        : 'bg-green-50 border-green-300'
                                }`}>
                                    <h3 className="text-xl font-semibold mb-3">Vedha Dosha</h3>
                                    <div className={`text-4xl font-bold mb-3 ${
                                        matchResult?.rajjuVedha.is_vedha_dosha_present ? 'text-red-600' : 'text-green-600'
                                    }`}>
                                        {matchResult?.rajjuVedha.is_vedha_dosha_present ? 'Present' : 'Absent'}
                                    </div>
                                    <p className="text-gray-600">
                                        {matchResult?.rajjuVedha.is_vedha_dosha_present 
                                            ? 'Vedha Dosha may create obstacles in married life' 
                                            : 'No Vedha Dosha detected - smooth marital journey'}
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Papasamaya Detailed Analysis */}
                        <motion.div className="mt-10 p-6 bg-white rounded-xl shadow-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.5 }}>
                            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Papasamaya (Karma) Analysis</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                {/* Boy's Papa Analysis */}
                                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg border-2 border-blue-200">
                                    <h3 className="text-xl font-semibold text-blue-800 mb-4 text-center">Boy's Papa Scores</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-gray-700">Rahu Papa:</span>
                                            <span className="font-bold text-blue-600">{matchResult?.papasamaya.boy_papa?.rahu_papa}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-gray-700">Sun Papa:</span>
                                            <span className="font-bold text-yellow-600">{matchResult?.papasamaya.boy_papa?.sun_papa}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-gray-700">Saturn Papa:</span>
                                            <span className="font-bold text-gray-600">{matchResult?.papasamaya.boy_papa?.saturn_papa}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-gray-700">Mars Papa:</span>
                                            <span className="font-bold text-red-600">{matchResult?.papasamaya.boy_papa?.mars_papa}</span>
                                        </div>
                                        <div className="border-t pt-2 mt-2">
                                            <div className="flex justify-between items-center">
                                                <span className="font-semibold text-gray-800">Total Papa:</span>
                                                <span className="font-bold text-red-600 text-lg">{matchResult?.papasamaya.boy_total}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Girl's Papa Analysis */}
                                <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-lg border-2 border-pink-200">
                                    <h3 className="text-xl font-semibold text-pink-800 mb-4 text-center">Girl's Papa Scores</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-gray-700">Rahu Papa:</span>
                                            <span className="font-bold text-blue-600">{matchResult?.papasamaya.girl_papa?.rahu_papa}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-gray-700">Sun Papa:</span>
                                            <span className="font-bold text-yellow-600">{matchResult?.papasamaya.girl_papa?.sun_papa}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-gray-700">Saturn Papa:</span>
                                            <span className="font-bold text-gray-600">{matchResult?.papasamaya.girl_papa?.saturn_papa}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-gray-700">Mars Papa:</span>
                                            <span className="font-bold text-red-600">{matchResult?.papasamaya.girl_papa?.mars_papa}</span>
                                        </div>
                                        <div className="border-t pt-2 mt-2">
                                            <div className="flex justify-between items-center">
                                                <span className="font-semibold text-gray-800">Total Papa:</span>
                                                <span className="font-bold text-red-600 text-lg">{matchResult?.papasamaya.girl_total}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Papa Score Comparison */}
                            <div className="bg-gradient-to-br from-gray-50 to-purple-50 p-6 rounded-lg border-2 border-purple-200">
                                <h3 className="text-xl font-semibold text-purple-800 mb-4 text-center">Papa Score Comparison</h3>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600">{matchResult?.papasamaya.boy_total}</div>
                                        <div className="text-sm text-gray-600">Boy's Total Papa</div>
                                    </div>
                                    <div className="text-2xl text-gray-400 mx-4">vs</div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-pink-600">{matchResult?.papasamaya.girl_total}</div>
                                        <div className="text-sm text-gray-600">Girl's Total Papa</div>
                                    </div>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-4">
                                    <div 
                                        className="bg-gradient-to-r from-blue-500 to-pink-500 h-4 rounded-full transition-all duration-500"
                                        style={{ 
                                            width: `${Math.max(matchResult?.papasamaya.boy_total, matchResult?.papasamaya.girl_total)}%` 
                                        }}
                                    ></div>
                                </div>
                                <p className="text-center text-sm text-gray-600 mt-2">
                                    Difference: {Math.abs(matchResult?.papasamaya.boy_total - matchResult?.papasamaya.girl_total).toFixed(2)} points
                                </p>
                            </div>
                        </motion.div>

                        {/* Dashakoot Detailed Table */}
                        <motion.div className="mt-10 p-6 bg-white rounded-xl shadow-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.5 }}>
                            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Dashakoot Matching Details</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full border border-gray-300">
                                    <thead className="bg-red-100 text-red-800">
                                        <tr>
                                            <th className="px-4 py-3 text-left font-semibold">Attribute</th>
                                            <th className="px-4 py-3 text-left font-semibold">Boy</th>
                                            <th className="px-4 py-3 text-left font-semibold">Girl</th>
                                            <th className="px-4 py-3 text-left font-semibold">Score</th>
                                            <th className="px-4 py-3 text-left font-semibold">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white text-gray-700">
                                        {matchKeys.map((key) => {
                                            const item = matchResult?.dashakoot[key];
                                            return item ? (
                                                <tr key={key} className="border-t border-gray-200 hover:bg-gray-50 transition-colors">
                                                    <td className="px-4 py-3 font-semibold text-yellow-700">{item.name}</td>
                                                    <td className="px-4 py-3">
                                                        {item.boy_star || item.boy_gana || item.boy_rajju || item.boy_rasi || item.boy_lord || item.boy_yoni}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {item.girl_star || item.girl_gana || item.girl_rajju || item.girl_rasi || item.girl_lord || item.girl_yoni}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span className={`font-semibold ${
                                                            item[key] >= 0.8 ? 'text-green-600' :
                                                            item[key] >= 0.5 ? 'text-yellow-600' : 'text-red-600'
                                                        }`}>
                                                            {item[key]}/{item.full_score}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm">{item.description}</td>
                                                </tr>
                                            ) : null;
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>

                        {/* Aggregate Match Details */}
                        {matchResult?.aggregate && (
                            <motion.div className="mt-10 p-6 bg-white rounded-xl shadow-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.5 }}>
                                <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Detailed Compatibility Analysis</h2>
                                
                                {/* Dosha Analysis */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                                        <h3 className="text-lg font-semibold text-red-800 mb-3">Mangal Dosha Analysis</h3>
                                        <div className="space-y-2">
                                            <p><strong>Boy Mangalik:</strong> {matchResult?.aggregate.manglik_boy ? 'Yes' : 'No'}</p>
                                            <p><strong>Girl Mangalik:</strong> {matchResult?.aggregate.manglik_girl ? 'Yes' : 'No'}</p>
                                            <p><strong>Mangal Dosha Impact:</strong> {matchResult?.aggregate.mangal_dosha_impact}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                                        <h3 className="text-lg font-semibold text-orange-800 mb-3">Other Dosha Analysis</h3>
                                        <div className="space-y-2">
                                            <p><strong>Rajju Dosha:</strong> {matchResult?.aggregate.rajju_dosha ? 'Present' : 'Absent'}</p>
                                            <p><strong>Vedha Dosha:</strong> {matchResult?.aggregate.vedha_dosha ? 'Present' : 'Absent'}</p>
                                            <p><strong>Nadi Dosha:</strong> {matchResult?.aggregate.nadi_dosha ? 'Present' : 'Absent'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Compatibility Factors */}
                                <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-lg border border-gray-200">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Additional Compatibility Factors</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p><strong>Mental Compatibility:</strong> {matchResult?.aggregate.mental_compatibility}</p>
                                            <p><strong>Physical Compatibility:</strong> {matchResult?.aggregate.physical_compatibility}</p>
                                            <p><strong>Financial Compatibility:</strong> {matchResult?.aggregate.financial_compatibility}</p>
                                        </div>
                                        <div>
                                            <p><strong>Health Compatibility:</strong> {matchResult?.aggregate.health_compatibility}</p>
                                            <p><strong>Family Compatibility:</strong> {matchResult?.aggregate.family_compatibility}</p>
                                            <p><strong>Career Compatibility:</strong> {matchResult?.aggregate.career_compatibility}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Recommendations */}
                                {matchResult?.aggregate.recommendations && (
                                    <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                                        <h3 className="text-lg font-semibold text-yellow-800 mb-2">Astrological Recommendations</h3>
                                        <p className="text-gray-700">{matchResult?.aggregate.recommendations}</p>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </>
                )}
            </motion.div>
        </div>
    );
};

// InputField and FormSection components remain the same
const InputField = ({ label, id, value, onChange }) => (
    <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <Input id={id} value={value} onChange={(e) => onChange(e.target.value)} placeholder={label} type="text" />
    </div>
);

const FormSection = ({ title, state, setState }) => (
    <div className="space-y-6 border border-primary-theme rounded-xl p-6 shadow-sm bg-slate-50">
        <h3 className="text-xl font-semibold text-primary-theme mb-4 text-center">{title}</h3>
        <div className="grid grid-cols-3 gap-4">
            <InputField label="Day" id={`${title}-Day`} value={state.day} onChange={(v) => setState({ ...state, day: v })} />
            <InputField label="Month" id={`${title}-Month`} value={state.month} onChange={(v) => setState({ ...state, month: v })} />
            <InputField label="Year" id={`${title}-Year`} value={state.year} onChange={(v) => setState({ ...state, year: v })} />
        </div>
        <div className="grid grid-cols-3 gap-4">
            <InputField label="Hour" id={`${title}-Hour`} value={state.hour} onChange={(v) => setState({ ...state, hour: v })} />
            <InputField label="Minute" id={`${title}-Minute`} value={state.minute} onChange={(v) => setState({ ...state, minute: v })} />
            <InputField label="Second" id={`${title}-Second`} value={state.second} onChange={(v) => setState({ ...state, second: v })} />
        </div>
        <InputField label="Place of Birth" id={`${title}-Place`} value={state.place} onChange={(v) => setState({ ...state, place: v })} />
    </div>
);

export default KundaliMatching;
