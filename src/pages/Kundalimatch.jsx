import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
// import { BookUser } from 'lucide-react';
// const baseurl=import.meta.env.REACT_APP_VEDICAPI

const KundliPage = () => {
    const [boy, setBoy] = useState({
        name: "",
        gender: "",
        day: "",
        month: "",
        year: "",
        hour: "",
        minute: "",
        second: "",
        place: "",
    });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    // 🧾 Handle input change
    const handleChange = (e) => {
        const { id, value } = e.target;
        setBoy((prev) => ({ ...prev, [id]: value }));
    };

    const handleGenerateKundli = async () => {
        console.log("handle generate kundali.")
        setLoading(true);

        const boyDob = `${boy.day}/${boy.month}/${boy.year}`;
        const boyTob = `${boy.hour}:${boy.minute}`;

        const params = {
            dob: boyDob,
            tob: boyTob,
            lat: "1",
            lon: "1",
            tz: "5.5",
            lang: "en",
            api_key: "349e48af-b57e-58aa-ad9c-623f1ab5a5f7"
        };

        try {
            // 🔹 Call both APIs simultaneously
            const [kundaliDetail, currentSadheSAti] = await Promise.all([
                axios.get("https://api.vedicastroapi.com/v3-json/extended-horoscope/extended-kundli-details", { params }),
                axios.get("https://api.vedicastroapi.com/v3-json/extended-horoscope/current-sade-sati", { params }),
            ]);

            // 🔹 Combine both responses
            const combinedData = {
                kundali: kundaliDetail.data.response,
                dosh: currentSadheSAti.data.response,
            };

            console.log("✅ Combined Match Result:", combinedData);
            setResult(combinedData);

            // 🔹 Reset form
            setBoy({
                name: "",
                gender: "",
                day: "",
                month: "",
                year: "",
                hour: "",
                minute: "",
                second: "",
                place: "",
            });

        } catch (error) {
            console.error("❌ Failed to fetch matchmaking data:", error?.response?.data || error.message);

        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="min-h-screen py-4 md:p-8 mt-[4rem] " style={{ backgroundColor: 'hsl(var(--light-red-secondary))' }}>
            <motion.div
                className=" mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Card className="shadow-2xl rounded-xl overflow-hidden border-2 border-primary-theme">
                    <CardHeader className="text-center p-8 bg-gradient-to-br from-red-400 via-pink-400 to-rose-300" style={{ backgroundColor: 'hsl(var(--light-red-primary))' }}>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
                            className="mx-auto bg-white rounded-full p-4 inline-block shadow-lg mb-4"
                        >
                        </motion.div>
                        <CardTitle className="text-4xl font-bold text-white">Kundli</CardTitle>
                        <CardDescription className="text-lg text-red-100 mt-2">
                            Get instant & accurate, Janam Kundli
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 md:p-10 space-y-8 bg-white">

                        {/* <form onSubmit={handleGenerateKundli} className="space-y-8"> */}
                        {/* Full Name + Gender */}
                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-md font-medium text-gray-700">
                                    Full Name
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="Enter your full name"
                                    value={boy.name}
                                    onChange={handleChange}
                                    className="text-lg p-3 focus:ring-primary-theme focus:border-primary-theme"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="gender" className="text-md font-medium text-gray-700">
                                    Gender
                                </Label>
                                <select
                                    id="gender"
                                    value={boy.gender}
                                    onChange={handleChange}
                                    className="text-lg p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary-theme focus:border-primary-theme"
                                >
                                    <option value="" disabled>
                                        Select
                                    </option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>

                        {/* DOB */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="day" className="text-md font-medium text-gray-700">
                                    Birth Day
                                </Label>
                                <Input
                                    id="day"
                                    type="number"
                                    placeholder="DD"
                                    value={boy.day}
                                    onChange={handleChange}
                                    className="text-lg p-3 focus:ring-primary-theme focus:border-primary-theme"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="month" className="text-md font-medium text-gray-700">
                                    Birth Month
                                </Label>
                                <Input
                                    id="month"
                                    type="number"
                                    placeholder="MM"
                                    value={boy.month}
                                    onChange={handleChange}
                                    className="text-lg p-3 focus:ring-primary-theme focus:border-primary-theme"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="year" className="text-md font-medium text-gray-700">
                                    Birth Year
                                </Label>
                                <Input
                                    id="year"
                                    type="number"
                                    placeholder="YYYY"
                                    value={boy.year}
                                    onChange={handleChange}
                                    className="text-lg p-3 focus:ring-primary-theme focus:border-primary-theme"
                                />
                            </div>
                        </div>

                        {/* TOB */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="hour" className="text-md font-medium text-gray-700">
                                    Birth Hour
                                </Label>
                                <Input
                                    id="hour"
                                    type="number"
                                    placeholder="HH (24h)"
                                    value={boy.hour}
                                    onChange={handleChange}
                                    className="text-lg p-3 focus:ring-primary-theme focus:border-primary-theme"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="minute" className="text-md font-medium text-gray-700">
                                    Birth Minute
                                </Label>
                                <Input
                                    id="minute"
                                    type="number"
                                    placeholder="MM"
                                    value={boy.minute}
                                    onChange={handleChange}
                                    className="text-lg p-3 focus:ring-primary-theme focus:border-primary-theme"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="second" className="text-md font-medium text-gray-700">
                                    Birth Second (Optional)
                                </Label>
                                <Input
                                    id="second"
                                    type="number"
                                    placeholder="SS"
                                    value={boy.second}
                                    onChange={handleChange}
                                    className="text-lg p-3 focus:ring-primary-theme focus:border-primary-theme"
                                />
                            </div>
                        </div>

                        {/* Place */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="place"
                                className="text-md font-medium text-gray-700"
                            >
                                Place of Birth
                            </Label>
                            <Input
                                id="place"
                                placeholder="Enter city and country"
                                value={boy.place}
                                onChange={handleChange}
                                className="text-lg p-3 focus:ring-primary-theme focus:border-primary-theme"
                            />
                        </div>

                        {/* Button */}
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                                className="w-full text-xl py-4 btn-primary-theme text-white font-semibold"
                                size="lg"
                                onClick={() => handleGenerateKundli()}
                            >
                                {loading ? "Generating..." : "Generate My Kundli"}
                            </Button>
                        </motion.div>
                        {/* </form> */}

                        <p className="text-center text-sm text-gray-600">
                            By generating your Kundli, you agree to our <a href="/terms-of-service" className="text-primary-theme hover:underline">Terms of Service</a> and <a href="/privacy-policy" className="text-primary-theme hover:underline">Privacy Policy</a>.
                        </p>
                    </CardContent>
                </Card>

                {/* Placeholder for Kundli result display */}
                <motion.div
                    className="mt-10 p-6 bg-white rounded-xl shadow-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    {!result ? (
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">Your Kundli Details Will Appear Here</h2>
                            <div className="h-64 flex items-center justify-center border-2 border-dashed border-red-300 rounded-lg">
                                <p className="text-gray-400 text-lg">Awaiting birth details...</p>
                            </div>
                        </div>
                    ) : (
                        <div className=' grid grid-cols-1 md:grid-cols-2 gap-6'  >
                            <div>
                                <p>Avakhada Details</p>
                                <div className='border-2 border-s-violet-400 p-4 flex flex-col gap-2 mt-1'>
                                    <div className='grid grid-cols-1 md:grid-cols-2'>
                                        <p>Varna</p>
                                        <p>{result?.kundali?.varna} </p>
                                    </div>
                                    <div className='grid grid-cols-1 md:grid-cols-2'>
                                        <p>Vasya</p>
                                        <p>{result?.kundali?.vasya} </p>
                                    </div>
                                    <div className='grid grid-cols-1 md:grid-cols-2'>
                                        <p>Yoni</p>
                                        <p>{result?.kundali?.yoni} </p>
                                    </div>
                                    <div className='grid grid-cols-1 md:grid-cols-2'>
                                        <p>Gana</p>
                                        <p>{result?.kundali?.gana} </p>
                                    </div>
                                    <div className='grid grid-cols-1 md:grid-cols-2'>
                                        <p>Nadi</p>
                                        <p>{result?.kundali?.nadi} </p>
                                    </div>
                                    <div className='grid grid-cols-1 md:grid-cols-2'>
                                        <p>Rasi</p>
                                        <p>{result?.kundali?.rasi} </p>
                                    </div>
                                    <div className='grid grid-cols-1 md:grid-cols-2'>
                                        <p>Rasi Lord</p>
                                        <p>{result?.kundali?.rasi_lord} </p>
                                    </div>
                                    <div className='grid grid-cols-1 md:grid-cols-2'>
                                        <p>Nakshatra</p>
                                        <p>{result?.kundali?.nakshatra} </p>
                                    </div>
                                    <div className='grid grid-cols-1 md:grid-cols-2'>
                                        <p>Yoga</p>
                                        <p>{result?.kundali?.yoga} </p>
                                    </div>
                                    <div className='grid grid-cols-1 md:grid-cols-2'>
                                        <p>Karana</p>
                                        <p>{result?.kundali?.karana} </p>
                                    </div>
                                    <div className='grid grid-cols-1 md:grid-cols-2'>
                                        <p>Tithi</p>
                                        <p>{result?.kundali?.tithi} </p>
                                    </div>
                                    <div className='grid grid-cols-1 md:grid-cols-2'>
                                        <p>Tatva</p>
                                        <p>{result?.kundali?.tatva} </p>
                                    </div>
                                    <div className='grid grid-cols-1 md:grid-cols-2'>
                                        <p>Name Start</p>
                                        <p>{result?.kundali?.name_start} </p>
                                    </div>
                                    <div className='grid grid-cols-1 md:grid-cols-2'>
                                        <p>Paya</p>
                                        <p>{result?.kundali?.paya} </p>
                                    </div>
                                </div>
                            </div>
                            <div >
                                <div>
                                    <p>Panchang Details</p>
                                    <div className='border-2 border-s-violet-400 p-4 flex flex-col gap-2 mt-1'>
                                        <div className='grid grid-cols-1 md:grid-cols-2'>
                                            <p>Tithi</p>
                                            <p>{result?.kundali?.tithi} </p>
                                        </div>
                                        <div className='grid grid-cols-1 md:grid-cols-2'>
                                            <p>Karana</p>
                                            <p>{result?.kundali?.karana} </p>
                                        </div>
                                        <div className='grid grid-cols-1 md:grid-cols-2'>
                                            <p>Nakshatra</p>
                                            <p>{result?.kundali?.nakshatra} </p>
                                        </div>
                                        <div className='grid grid-cols-1 md:grid-cols-2'>
                                            <p>Yoga</p>
                                            <p>{result?.kundali?.yoga} </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-4'>
                                    <p>Sadhe Sati Details</p>
                                    <div className='border-2 border-s-violet-400 p-4 flex flex-col gap-2 mt-1'>
                                        <div className='grid grid-cols-1 md:grid-cols-2'>
                                            <p>Age</p>
                                            <p>{result?.dosh?.age} </p>
                                        </div>
                                        <div className='grid grid-cols-1 md:grid-cols-2'>
                                            <p>Date Considered</p>
                                            <p>{result?.dosh?.date_considered} </p>
                                        </div>
                                        <div className='grid grid-cols-1 md:grid-cols-2'>
                                            <p>Result</p>
                                            <p>{result?.dosh?.bot_response} </p>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default KundliPage;