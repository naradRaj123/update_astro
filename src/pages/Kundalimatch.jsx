import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { Star, Calendar, AlertTriangle, ChevronDown } from 'lucide-react';
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
    const [chartImages, setChartImages] = useState(null);
    const [yearlyPrediction, setYearlyPrediction] = useState(null);
    const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);

    // 🧾 Handle input change
    const handleChange = (e) => {
        const { id, value } = e.target;
        setBoy((prev) => ({ ...prev, [id]: value }));
    };

    const handleGenerateKundli = async () => {
        console.log("handle generate kundali.")
        setLoading(true);
        setResult(null);
        setChartImages(null);

        const boyDob = `${boy.day}/${boy.month}/${boy.year}`;
        const boyTob = `${boy.hour}:${boy.minute}`;

        const currentDate = new Date();
        const startDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

        const baseParams = {
            dob: boyDob,
            tob: boyTob,
            lat: "24", // Using default values as per API requirement
            lon: "38", // Using default values as per API requirement
            tz: "5.5",
            lang: "en",
            api_key: "349e48af-b57e-58aa-ad9c-623f1ab5a5f7",
            style: "north"
        };

        try {
            // 🔹 Call all APIs simultaneously
            const [kundaliDetail, currentSadheSAti, yearlyPrediction, d1Chart, d3Chart, d7Chart, d9Chart, d10Chart] = await Promise.all([
                axios.get("https://api.vedicastroapi.com/v3-json/extended-horoscope/extended-kundli-details", { params: baseParams }),
                axios.get("https://api.vedicastroapi.com/v3-json/extended-horoscope/current-sade-sati", { params: baseParams }),
                // 12 Month AI Prediction API
                axios.get("https://api.vedicastroapi.com/v3-json/horoscope/ai-12-month-prediction", {
                    params: { ...baseParams, start_date: startDate }
                }),
                // Chart APIs with different divisions
                axios.get("https://api.vedicastroapi.com/v3-json/horoscope/chart-image", {
                    params: { ...baseParams, div: "D1" }
                }),
                axios.get("https://api.vedicastroapi.com/v3-json/horoscope/chart-image", {
                    params: { ...baseParams, div: "D3" }
                }),
                axios.get("https://api.vedicastroapi.com/v3-json/horoscope/chart-image", {
                    params: { ...baseParams, div: "D7" }
                }),
                axios.get("https://api.vedicastroapi.com/v3-json/horoscope/chart-image", {
                    params: { ...baseParams, div: "D9" }
                }),
                axios.get("https://api.vedicastroapi.com/v3-json/horoscope/chart-image", {
                    params: { ...baseParams, div: "D10" }
                }),
            ]);

            // 🔹 Combine all responses
            const combinedData = {
                kundali: kundaliDetail.data.response,
                dosh: currentSadheSAti.data.response,
            };

            const chartData = {
                d1: d1Chart.data,
                d3: d3Chart.data,
                d7: d7Chart.data,
                d9: d9Chart.data,
                d10: d10Chart.data,
            };

            setResult(combinedData);
            setYearlyPrediction(yearlyPrediction.data.response);
            setChartImages(chartData);

            console.log("yearly prediction", yearlyPrediction.data.response);

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

    // Function to render SVG from API response
    const renderChart = (svgContent, title, description) => (
        <div className="bg-white p-4 rounded-lg border-2 border-purple-200 shadow-lg">
            <h3 className="text-lg font-bold text-purple-700 mb-2 text-center">{title}</h3>
            <p className="text-sm text-gray-600 text-center mb-4">{description}</p>
            <div
                className="flex justify-center items-center bg-gray-50 rounded-lg p-4 border border-gray-200"
                dangerouslySetInnerHTML={{ __html: svgContent }}
            />
        </div>
    );


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
                            Get instant & accurate, Janam Kundli with Detailed Charts
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


                {/* //=========================================================================== */}

                {(result || chartImages || yearlyPrediction) && (
                    <motion.div
                        className="mt-10 space-y-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        {/* Kundli Details Section */}
                        {result && (
                            <Card className="shadow-2xl rounded-xl overflow-hidden border-2 border-primary-theme">
                                <CardHeader className="text-center p-6 bg-gradient-to-br from-red-400 via-pink-400 to-rose-300">
                                    <CardTitle className="text-3xl font-bold text-white">Kundli Details</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 bg-white">
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                        <div>
                                            <h3 className="text-xl font-bold text-purple-700 mb-4 flex items-center">
                                                <Star className="w-5 h-5 mr-2" />
                                                Avakhada Details
                                            </h3>
                                            <div className='border-2 border-purple-300 p-4 rounded-lg bg-purple-50 flex flex-col gap-3'>
                                                {[
                                                    { label: "Varna", value: result?.kundali?.varna },
                                                    { label: "Vasya", value: result?.kundali?.vasya },
                                                    { label: "Yoni", value: result?.kundali?.yoni },
                                                    { label: "Gana", value: result?.kundali?.gana },
                                                    { label: "Nadi", value: result?.kundali?.nadi },
                                                    { label: "Rasi", value: result?.kundali?.rasi },
                                                    { label: "Rasi Lord", value: result?.kundali?.rasi_lord },
                                                    { label: "Nakshatra", value: result?.kundali?.nakshatra },
                                                    { label: "Yoga", value: result?.kundali?.yoga },
                                                    { label: "Karana", value: result?.kundali?.karana },
                                                    { label: "Tithi", value: result?.kundali?.tithi },
                                                    { label: "Tatva", value: result?.kundali?.tatva },
                                                    { label: "Name Start", value: result?.kundali?.name_start },
                                                    { label: "Paya", value: result?.kundali?.paya },
                                                ].map((item, index) => (
                                                    <div key={index} className='grid grid-cols-1 md:grid-cols-2 gap-2 py-2 border-b border-purple-200 last:border-b-0'>
                                                        <p className="font-semibold text-gray-700">{item.label}</p>
                                                        <p className="text-gray-800 font-medium">{item.value || "N/A"}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <div>
                                                <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center">
                                                    <Calendar className="w-5 h-5 mr-2" />
                                                    Panchang Details
                                                </h3>
                                                <div className='border-2 border-blue-300 p-4 rounded-lg bg-blue-50 flex flex-col gap-3'>
                                                    {[
                                                        { label: "Tithi", value: result?.kundali?.tithi },
                                                        { label: "Karana", value: result?.kundali?.karana },
                                                        { label: "Nakshatra", value: result?.kundali?.nakshatra },
                                                        { label: "Yoga", value: result?.kundali?.yoga },
                                                    ].map((item, index) => (
                                                        <div key={index} className='grid grid-cols-1 md:grid-cols-2 gap-2 py-2 border-b border-blue-200 last:border-b-0'>
                                                            <p className="font-semibold text-gray-700">{item.label}</p>
                                                            <p className="text-gray-800 font-medium">{item.value || "N/A"}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center">
                                                    <AlertTriangle className="w-5 h-5 mr-2" />
                                                    Sadhe Sati Details
                                                </h3>
                                                <div className='border-2 border-red-300 p-4 rounded-lg bg-red-50 flex flex-col gap-3'>
                                                    {[
                                                        { label: "Age", value: result?.dosh?.age },
                                                        { label: "Date Considered", value: result?.dosh?.date_considered },
                                                        { label: "Result", value: result?.dosh?.bot_response },
                                                    ].map((item, index) => (
                                                        <div key={index} className='grid grid-cols-1 md:grid-cols-2 gap-2 py-2 border-b border-red-200 last:border-b-0'>
                                                            <p className="font-semibold text-gray-700">{item.label}</p>
                                                            <p className="text-gray-800 font-medium">{item.value || "N/A"}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* 12 Month AI Prediction Section */}
                        {yearlyPrediction && (
                            <Card className="shadow-2xl rounded-xl overflow-hidden border-2 border-green-300">
                                <CardHeader className="text-center p-6 bg-gradient-to-br from-green-400 via-blue-400 to-purple-300">
                                    <CardTitle className="text-3xl font-bold text-white">12-Month AI Prediction</CardTitle>
                                    <CardDescription className="text-lg text-green-100 mt-2">
                                        Comprehensive Monthly Predictions for the Next Year
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-6 bg-white">
                                    {/* Month Selection Tabs */}
                                    <div className="mb-6">
                                        <div className="flex overflow-x-auto pb-2 space-x-1">
                                            {yearlyPrediction.map((monthData, index) => {
                                                const startDate = new Date(monthData.specifications.start_date);
                                                const monthName = startDate.toLocaleDateString('en-US', { month: 'short' });
                                                const year = startDate.getFullYear();

                                                return (
                                                    <button
                                                        key={index}
                                                        onClick={() => setSelectedMonthIndex(index)}
                                                        className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${selectedMonthIndex === index
                                                                ? 'bg-green-500 text-white shadow-md'
                                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                            }`}
                                                    >
                                                        {monthName} {year}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {/* Selected Month Info */}
                                        {yearlyPrediction[selectedMonthIndex] && (
                                            <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                                                <div className="flex flex-wrap justify-between items-center gap-4">
                                                    <div>
                                                        <h4 className="text-lg font-bold text-green-700">
                                                            {yearlyPrediction[selectedMonthIndex].specifications.start_month} {new Date(yearlyPrediction[selectedMonthIndex].specifications.start_date).getFullYear()}
                                                        </h4>
                                                        <p className="text-sm text-gray-600">
                                                            {yearlyPrediction[selectedMonthIndex].specifications.start_date} - {yearlyPrediction[selectedMonthIndex].specifications.end_date}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm font-semibold text-green-700">
                                                            Dasha Period
                                                        </p>
                                                        <p className="text-sm text-gray-700">
                                                            {yearlyPrediction[selectedMonthIndex].specifications.dasha}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Selected Month Predictions */}
                                    {yearlyPrediction[selectedMonthIndex] && (
                                        <motion.div
                                            key={selectedMonthIndex}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-4"
                                        >
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {Object.entries(yearlyPrediction[selectedMonthIndex].predictions).map(([category, data]) => (
                                                    <div key={category} className="bg-white p-4 rounded-lg border border-green-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                                                        <div className="flex justify-between items-start mb-3">
                                                            <h4 className="font-bold text-green-700 capitalize text-lg">
                                                                {category.replace(/_/g, ' ')}
                                                            </h4>
                                                            <div className="flex flex-col items-end">
                                                                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${data.outcome === 'positive'
                                                                        ? 'bg-green-100 text-green-700'
                                                                        : data.outcome === 'negative'
                                                                            ? 'bg-red-100 text-red-700'
                                                                            : 'bg-yellow-100 text-yellow-700'
                                                                    }`}>
                                                                    {data.outcome}
                                                                </span>
                                                                <span className={`text-xs mt-1 font-medium ${data.probability === 'high'
                                                                        ? 'text-green-600'
                                                                        : data.probability === 'medium'
                                                                            ? 'text-yellow-600'
                                                                            : 'text-red-600'
                                                                    }`}>
                                                                    {data.probability} probability
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* House Scores */}
                                                        {data.houseScores && Object.keys(data.houseScores).length > 0 && (
                                                            <div className="mb-3">
                                                                <p className="text-xs font-semibold text-gray-600 mb-2">House Influences:</p>
                                                                <div className="flex flex-wrap gap-1">
                                                                    {Object.entries(data.houseScores).map(([house, score]) => (
                                                                        <span
                                                                            key={house}
                                                                            className={`text-xs px-2 py-1 rounded ${score === 'positive'
                                                                                    ? 'bg-green-100 text-green-700 border border-green-200'
                                                                                    : score === 'negative'
                                                                                        ? 'bg-red-100 text-red-700 border border-red-200'
                                                                                        : 'bg-gray-100 text-gray-700 border border-gray-200'
                                                                                }`}
                                                                        >
                                                                            House {house}: {score}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        <p className="text-sm text-gray-700 leading-relaxed mb-3">
                                                            {data.bot_response}
                                                        </p>

                                                        {/* Planetary Contributors */}
                                                        {data.contributors && (
                                                            <details className="group">
                                                                <summary className="cursor-pointer text-green-600 text-sm font-semibold hover:text-green-700 flex items-center">
                                                                    <ChevronDown className="w-4 h-4 mr-1 group-open:rotate-180 transition-transform" />
                                                                    Planetary Influences
                                                                </summary>
                                                                <div className="mt-2 p-3 bg-green-50 rounded text-sm text-gray-700 border border-green-200">
                                                                    <p>{data.contributors}</p>
                                                                </div>
                                                            </details>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {/* Chart Images Section */}
                        {chartImages && (
                            <Card className="shadow-2xl rounded-xl overflow-hidden border-2 border-purple-300">
                                <CardHeader className="text-center p-6 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-300">
                                    <CardTitle className="text-3xl font-bold text-white">Divisional Charts</CardTitle>
                                    <CardDescription className="text-lg text-purple-100 mt-2">
                                        Detailed Astrological Charts for Comprehensive Analysis
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-6 bg-white">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {renderChart(
                                            chartImages.d1,
                                            "D1 - Lagna Chart (Rasi)",
                                            "Main birth chart showing planetary positions at birth"
                                        )}
                                        {renderChart(
                                            chartImages.d3,
                                            "D3 - Somanatha Chart",
                                            // "Main birth chart showing planetary positions at birth"
                                        )}
                                        {renderChart(
                                            chartImages.d7,
                                            "D7 - Saptamsa Chart",
                                            "Chart related to children and creativity"
                                        )}
                                        {renderChart(
                                            chartImages.d9,
                                            "D9 - Navamsa Chart",
                                            "Spiritual chart showing inner self and marriage"
                                        )}
                                        {renderChart(
                                            chartImages.d10,
                                            "D10 - Dasamsa Chart",
                                            "Career and professional achievements chart"
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                    </motion.div>
                )}

                {/* Placeholder when no data */}
                {!result && !loading && (
                    <motion.div
                        className="mt-10 p-6 bg-white rounded-xl shadow-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">Your Kundli Details Will Appear Here</h2>
                            <div className="h-64 flex items-center justify-center border-2 border-dashed border-red-300 rounded-lg bg-gradient-to-br from-red-50 to-pink-50">
                                <div className="text-center">
                                    <Star className="w-16 h-16 text-red-300 mx-auto mb-4" />
                                    <p className="text-gray-400 text-lg">Enter your birth details to generate comprehensive Kundli analysis</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
                {/* Placeholder for Kundli result display */}
                {/* <motion.div
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
                </motion.div> */}
            </motion.div>
        </div>
    );
};

export default KundliPage;