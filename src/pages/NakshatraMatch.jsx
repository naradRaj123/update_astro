import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import axios from 'axios';

const NakshatraMatchPage = () => {
  const [boyStar, setBoyStar] = useState('');
  const [girlStar, setGirlStar] = useState('');
  const [loading, setLoading] = useState(false);
  const [nakshatraData, setNakshatraData] = useState(null);

  const starOptions = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
    'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNakshatraData(null);

    const params = {
      boy_star: boyStar,
      girl_star: girlStar,
    };

    try {
      const response = await axios.get('http://localhost:8000/matching/nakshatra', { params });
      setNakshatraData(response.data.response); // assuming response.data.response holds the match data
    } catch (error) {
      console.error('Error fetching compatibility:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderRow = (attr) => {
    const item = nakshatraData[attr];
    if (!item || typeof item !== 'object') return null;

    const boy =
      item.boy_star ||
      item.boy_gana ||
      item.boy_rasi ||
      item.boy_rajju ||
      item.boy_lord ||
      item.boy_yoni;

    const girl =
      item.girl_star ||
      item.girl_gana ||
      item.girl_rasi ||
      item.girl_rajju ||
      item.girl_lord ||
      item.girl_yoni;

    const score = item[attr];
    const description = item.description;
    const name = item.name;

    return (
      <tr key={attr} className="border-t">
        <td className="px-4 py-2 font-semibold text-yellow-700">{name}</td>
        <td className="px-4 py-2">{boy || '-'}</td>
        <td className="px-4 py-2">{girl || '-'}</td>
        <td className="px-4 py-2">{score}</td>
        <td className="px-4 py-2">{description}</td>
      </tr>
    );
  };

  const matchKeys = ["dina", "gana", "mahendra", "rajju", "rasi", "rasiathi", "sthree", "vasya", "vedha", "yoni"];

  return (
    <div className="max-w-4xl mx-auto my-12">
      <Card className="shadow-xl border border-primary-theme rounded-xl">
        <CardHeader className="text-center p-6 bg-gradient-to-br from-rose-400 to-red-400">
          <CardTitle className="text-3xl font-bold text-white">Nakshatra Matching</CardTitle>
          <CardDescription className="text-white text-sm mt-1">
            Match stars based on traditional Nakshatra compatibility
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="p-6 space-y-6 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="block mb-2 text-sm font-medium">Boy Star</Label>
                <select
                  className="w-full border rounded-md px-3 py-2"
                  value={boyStar}
                  onChange={(e) => setBoyStar(e.target.value)}
                  required
                >
                  <option value="">Select Boy Star</option>
                  {starOptions.map((star, index) => (
                    <option key={star} value={index + 1}>
                      {star}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label className="block mb-2 text-sm font-medium">Girl Star</Label>
                <select
                  className="w-full border rounded-md px-3 py-2"
                  value={girlStar}
                  onChange={(e) => setGirlStar(e.target.value)}
                  required
                >
                  <option value="">Select Girl Star</option>
                  {starOptions.map((star, index) => (
                    <option key={star} value={index + 1}>
                      {star}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-3 btn-primary-theme text-white font-semibold"
              disabled={loading}
            >
              {loading ? 'Matching...' : 'Generate Match'}
            </Button>
          </CardContent>
        </form>
      </Card>

      {/* Show Result */}
      {nakshatraData && (
        <div className="mt-10">
          <Card className="shadow border">
            <CardHeader>
              <CardTitle className="text-xl text-center">
                Match Score: {nakshatraData?.score} / 10
              </CardTitle>
              <CardDescription className="text-center text-green-600 mt-1">
                {nakshatraData?.bot_response}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 text-sm text-gray-800">
                  <thead className="bg-red-100 text-red-800">
                    <tr>
                      <th className="px-4 py-2 text-left">Attribute</th>
                      <th className="px-4 py-2 text-left">Boy</th>
                      <th className="px-4 py-2 text-left">Girl</th>
                      <th className="px-4 py-2 text-left">Score</th>
                      <th className="px-4 py-2 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {matchKeys.map(renderRow)}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default NakshatraMatchPage;
