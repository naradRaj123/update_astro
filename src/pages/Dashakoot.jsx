import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';

const DashakootPage = () => {
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
            boy_lat: 1,
            boy_lon: 1,
            boy_tz: 5.5,
            girl_lat: 1,
            girl_lon: 1,
            girl_tz: 5.5,
            lang: "en",
        };

        try {
            const response = await axios.get("https://astro-talk-backend.onrender.com/matching/dashakoot", { params });
            console.log("✅ Match Result:", response.data);
            setMatchResult(response.data.response);
            setBoy({
                day: '', month: '', year: '',
                hour: '', minute: '', second: '',
                place: ''
            });
            setGirl({
                day: '', month: '', year: '',
                hour: '', minute: '', second: '',
                place: ''
            });

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
                        <CardTitle className="text-4xl font-bold text-white">Dashakoot Matching</CardTitle>
                        <CardDescription className="text-lg text-red-100 mt-2">
                            Discover your cosmic blueprint. Enter your birth details to generate your personalized Kundli.
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
                                    {loading ? "Generating..." : "Generate Matchmaking "}
                                </Button>
                            </motion.div>
                            <p className="text-center text-sm text-gray-600">
                                By generating Kundli, you agree to our <a href="/terms-of-service" className="text-primary-theme hover:underline">Terms of Service</a> and <a href="/privacy-policy" className="text-primary-theme hover:underline">Privacy Policy</a>.
                            </p>
                        </CardContent>
                    </form>
                </Card>

                {matchResult && (
                    <motion.div className="mt-10 p-6 bg-white rounded-xl shadow-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}>
                        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">Summary of Matchmaking Results</h2>
                        <p className="text-center text-lg font-medium text-green-600 mb-6">{matchResult.bot_response}</p>
                        <table className="min-w-full border border-gray-300">
                            <thead className="bg-red-100 text-red-800">
                                <tr>
                                    <th className="px-4 py-2 text-left">Attribute</th>
                                    <th className="px-4 py-2 text-left">Boy</th>
                                    <th className="px-4 py-2 text-left">Girl</th>
                                    <th className="px-4 py-2 text-left">Score</th>
                                    <th className="px-4 py-2 text-left">Description</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white text-gray-700">
                                {matchKeys.map((key) => {
                                    const item = matchResult[key];
                                    return item ? (
                                        <tr key={key} className="border-t border-gray-200">
                                            <td className="px-4 py-3 font-semibold text-yellow-700">{item.name}</td>
                                            <td className="px-4 py-3">{item[`boy_star`] || item[`boy_gana`] || item[`boy_rajju`] || item[`boy_rasi`] || item[`boy_lord`] || item[`boy_yoni`]}</td>
                                            <td className="px-4 py-3">{item[`girl_star`] || item[`girl_gana`] || item[`girl_rajju`] || item[`girl_rasi`] || item[`girl_lord`] || item[`girl_yoni`]}</td>
                                            <td className="px-4 py-3">{item[key]}</td>
                                            <td className="px-4 py-3">{item.description}</td>
                                        </tr>
                                    ) : null;
                                })}
                            </tbody>
                        </table>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

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

export default DashakootPage;
