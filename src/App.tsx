import {  useState } from "react"

function App() {

  const [includeUpperCase, setIncludeUpperCase] = useState<boolean>(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState<boolean>(false);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [passwordLength, setPasswordLenght] = useState<number>(15);
  const [password, setPassword] = useState<string>('');
  const [copyClicked, setCopyClicked] = useState(false);

  const generatePassword = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const lowercase: string = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase: string = lowercase.toUpperCase();
    const numbers: string = '0123456789';
    const specialChars: string = `!"#$%&()*+,-./:;<=>?@]/^_{|}~`;

    let charset  = lowercase;
    if(includeUpperCase) charset += uppercase;
    if (includeNumbers) charset += numbers;
    if (includeSpecialChars) charset += specialChars;

    let generated = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generated += charset[randomIndex];
    }

    setPassword(generated);
  };

  const copyPasswordToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopyClicked(true)
      setTimeout(() => {
        setCopyClicked(false)
      },1000)
  }
}

  return (
    <div className="flex justify-center items-center min-h-screen font-sans bg-gray-100 px-4">
      <form onSubmit={generatePassword} className="flex flex-col max-w-[600px] bg-white p-8 rounded-2xl shadow-lg w-full">
        <h1 className="text-3xl font-bold text-center mb-6">🔐 Password Generator</h1>
  
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={includeUpperCase}
              onChange={() => setIncludeUpperCase(!includeUpperCase)}
              className="accent-blue-500 w-4 h-4 cursor-pointer"
            />
            Include Uppercase Letters
          </label>
  
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={includeSpecialChars}
              onChange={() => setIncludeSpecialChars(!includeSpecialChars)}
              className="accent-blue-500 w-4 h-4 cursor-pointer"
            />
            Include Special Characters
          </label>
  
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
              className="accent-blue-500 w-4 h-4 cursor-pointer"
            />
            Include Numbers
          </label>
  
          <label className="col-span-2 text-sm mt-2">
            Password Length: <span className="font-semibold">{passwordLength}</span>
            <input
              type="range"
              min="5"
              max="25"
              value={passwordLength}
              onChange={(e) => setPasswordLenght(parseInt(e.target.value))}
              className="w-full mt-1 accent-blue-500 cursor-pointer"
            />
          </label>
        </div>
  
        <div className="bg-gray-100 text-center text-lg text-gray-800 font-mono mt-6 py-4 px-3 rounded-lg border border-gray-300">
          {password || 'Your password will appear here'}
        </div>
  
        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
          >
            Generate
          </button>
          <button
            type="button"
            onClick={copyPasswordToClipboard}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition cursor-pointer"
          >
            Copy
          </button>
        </div>
        {copyClicked && <p className="text-green-600 text-sm text-center">Password copied to clipboard!</p>}
  
      </form>
    </div>
  );
}

export default App
