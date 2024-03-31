// Replace the following two values
const MoodContractAddress = "0xEd0864f3574aF3D159a54118a77757d29a98f513";
const MoodContractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_mood",
				"type": "string"
			}
		],
		"name": "setModd",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getModd",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "mood",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
// Currently these two are undefined, we will use Ethers to assign them values
let MoodContract = undefined;
let signer = undefined;

const provider = new ethers.providers.Web3Provider(window.ethereum, "sepolia");

// Request access to user's wallet and assign 
(async () => {
	await provider.send('eth_requestAccounts', []);
	const accounts = await provider.listAccounts();
	signer = await provider.getSigner(accounts[0]);
	MoodContract = new ethers.Contract(
		MoodContractAddress,
		MoodContractABI,
		signer
	)
})()


async function getMood() {
    const mood = await MoodContract.getMood();
    document.getElementById('showMood').innerText = `Your mood: ${mood}`
    console.log(`[Mood] ${mood}`)
}

async function setMood() {
    const mood = document.getElementById('moodInput').value

    const r = await MoodContract.setMood(mood)
	document.getElementById('moodInput').value = ""
	console.log('[r]',r)

}