import { KeyPair, keyStores, connect, Near } from "near-api-js";
import { Twisters } from "twisters";
import BigNumber from "bignumber.js";
import fs from "fs";
import fetch from "node-fetch"

const levels = [
    {
        hot_price: 0,
        id: 10,
        mission: "",
        value: 10,
    },
    {
        hot_price: 0,
        id: 11,
        mission: "invite_friend",
        value: 12,
    },
    {
        hot_price: 0,
        id: 12,
        mission: "download_app",
        value: 15,
    },
    {
        hot_price: 0,
        id: 13,
        mission: "deposit_1NEAR",
        value: 18,
    },
    {
        hot_price: 0,
        id: 14,
        mission: "deposit_1USDT",
        value: 20,
    },
    {
        hot_price: 0,
        id: 15,
        mission: "deposit_NFT",
        value: 25,
    },
    {
        hot_price: 0,
        id: 20,
        mission: "",
        value: 720000000000,
    },
    {
        hot_price: 200000,
        id: 21,
        mission: "",
        value: 1080000000000,
    },
    {
        hot_price: 500000,
        id: 22,
        mission: "",
        value: 1440000000000,
    },
    {
        hot_price: 1000000,
        id: 23,
        mission: "",
        value: 2160000000000,
    },
    {
        hot_price: 4000000,
        id: 24,
        mission: "",
        value: 4320000000000,
    },
    {
        hot_price: 10000000,
        id: 25,
        mission: "",
        value: 8640000000000,
    },
    {
        hot_price: 0,
        id: 0,
        mission: "",
        value: 10000,
    },
    {
        hot_price: 200000,
        id: 1,
        mission: "",
        value: 15000,
    },
    {
        hot_price: 1000000,
        id: 2,
        mission: "",
        value: 20000,
    },
    {
        hot_price: 2000000,
        id: 3,
        mission: "",
        value: 25000,
    },
    {
        hot_price: 5000000,
        id: 4,
        mission: "",
        value: 30000,
    },
    {
        hot_price: 15000000,
        id: 5,
        mission: "",
        value: 50000,
    },
];
const storeFireplace = [
    {
        id: 0,
        title: "Fireplace",
        text: "Better Fireplace boosts mining speed",
        description: "Increase passive mining speed",
    },
    {
        id: 1,
        title: "Stone Fireplace",
        text: "Better Fireplace boosts mining speed",
        description: "Increase passive mining speed",
    },
    {
        id: 2,
        title: "Gas Fireplace",
        text: "Better Fireplace boosts mining speed",
        description: "Increase passive mining speed",
    },
    {
        id: 3,
        title: "Neon Fireplace",
        text: "Better Fireplace boosts mining speed",
        description: "Increase passive mining speed",
    },
    {
        id: 4,
        title: "Neon Multy-fireplace",
        text: "Better Fireplace boosts mining speed",
        description: "Increase passive mining speed",
    },
    {
        id: 5,
        title: "Neon Multy-fireplace",
        text: "Better Fireplace boosts mining speed",
        description: "Increase passive mining speed",
    },
    {
        id: 10,
        title: "Basic Wood",
        text: "Better wood give you a multiplier to HOT mining. Mining speed is Wood × Fireplace",
        description: "Boost mining speed by\n1.5x.. 2x.. 3x times!",
        mission_text: "",
    },
    {
        id: 11,
        title: "Neon Wood",
        text: "Better wood give you a multiplier to HOT mining. Mining speed is Wood × Fireplace",
        description: "Boost mining speed by\n1.5x.. 2x.. 3x times!",
        mission_text: "Invite a referral",
    },
    {
        id: 12,
        title: "Titanium Wood",
        text: "Better wood give you a multiplier to HOT mining. Mining speed is Wood × Fireplace",
        description: "Boost mining speed by\n1.5x.. 2x.. 3x times!",
        mission_text: "Download the mobile app and import your account",
    },
    {
        id: 13,
        title: "Jedi Wood",
        text: "Better wood give you a multiplier to HOT mining. Mining speed is Wood × Fireplace",
        description: "Boost mining speed by\n1.5x.. 2x.. 3x times!",
        mission_text: "Send 0.5+ NEAR from .near account, created at HERE Wallet",
    },
    {
        id: 14,
        title: "Uranium Boxes",
        text: "Better wood give you a multiplier to HOT mining. Mining speed is Wood × Fireplace",
        description: "Boost mining speed by\n1.5x.. 2x.. 3x times!",
        mission_text: "Deposit 1+ USDT on your account",
    },
    {
        id: 15,
        title: "Uranium Boxes",
        text: "Better wood give you a multiplier to HOT mining. Mining speed is Wood × Fireplace",
        description: "Boost mining speed by\n1.5x.. 2x.. 3x times!",
        mission_text: "Coming soon...",
    },
    {
        id: 19,
        title: "Super Fuel",
        text: "Better wood give you a multiplier to HOT mining. Mining speed is Wood × Fireplace",
        description: "Temporary booster for contest. Gives 5x!",
    },
    {
        id: 20,
        title: "Wooden Storage",
        text: "Better storage holds more HOT and you can claim it less often",
        description: "Increase the fill\ntime to claim less often",
    },
    {
        id: 21,
        title: "Metal Storage",
        text: "Better storage holds more HOT and you can claim it less often",
        description: "Increase the fill\ntime to claim less often",
    },
    {
        id: 22,
        title: "Modular Storage",
        text: "Better storage holds more HOT and you can claim it less often",
        description: "Increase the fill\ntime to claim less often",
    },
    {
        id: 23,
        title: "Liquid Storage",
        text: "Better storage holds more HOT and you can claim it less often",
        description: "Increase the fill\ntime to claim less often",
    },
    {
        id: 24,
        title: "Titanium Storage",
        text: "Better storage holds more HOT and you can claim it less often",
        description: "Increase the fill\ntime to claim less often",
    },
    {
        id: 25,
        title: "Titanium Storage",
        text: "Better storage holds more HOT and you can claim it less often",
        description: "Increase the fill\ntime to claim less often",
    },
];

const mainnetConfig = {
    networkId: "mainnet",
    nodeUrl: "https://rpc.mainnet.near.org",
    walletUrl: "https://wallet.mainnet.near.org",
    helperUrl: "https://helper.mainnet.near.org",
};

const near = new Near(mainnetConfig);
const twisters = new Twisters();

const AccountCall = (accountId, privateKey) =>
    new Promise(async (resolve, reject) => {
        try {
            const keyStore = new keyStores.InMemoryKeyStore();
            const keyPair = KeyPair.fromString(privateKey);
            await keyStore.setKey(mainnetConfig.networkId, accountId, keyPair);

            const connectionConfig = {
                deps: {
                    keyStore,
                },
                ...mainnetConfig,
            };

            const accountConnection = await connect(connectionConfig);
            const account = await accountConnection.account(accountId);

            resolve(account);
        } catch (error) {
            reject(error);
        }
    });

const miningProgress = (detailUser) => {
    const currentTime = Date.now();

    const timeSinceLastClaimHours =
        (currentTime - detailUser.last_claim / 1e6) / (1000 * 60 * 60);
    const hotPerHourInt = getHotPerHourInt(detailUser);
    const earnedHOT = timeSinceLastClaimHours * hotPerHourInt;

    return earnedHOT.toFixed(6);
};

const earned = (detailUser) => {
    const hotPerHourInt = getHotPerHourInt(detailUser);
    const earned = (storageCapacityMs(detailUser) / 3600000) * hotPerHourInt;

    return earned;
};

const storageCapacityMs = (detailUser) => {
    const storageBooster = getBooster(detailUser.storage);
    return Math.floor(parseInt(storageBooster.value + "0") / 1e6);
};

const getHotPerHourInt = (detailUser) => {
    const fireplaceBooster = getBooster(detailUser.firespace);
    const woodBooster = getBooster(detailUser.boost);
    return new BigNumber(woodBooster.value * fireplaceBooster.value).dividedBy(
        1e7
    );
};

const getDetailUser = async (near, accountId) => {
    const argument = {
        account_id: accountId,
    };

    const result = await near.connection.provider.query({
        account_id: "game.hot.tg",
        finality: "optimistic",
        request_type: "call_function",
        method_name: "get_user",
        args_base64: Buffer.from(JSON.stringify(argument)).toString("base64"),
    });

    const detailUser = JSON.parse(Buffer.from(result.result).toString());

    return detailUser;
};

const miningEarned = async (detailUser) => {
    const remainingMiningResult = earned(detailUser);

    return remainingMiningResult;
};

const getBooster = (e) => {
    let booster = levels.find((t) => t.id === e);
    if (!booster) return null;
    let additionalInfo = storeFireplace.find((t) => t.id === e);
    return additionalInfo ? { ...additionalInfo, ...booster } : booster;
};

const getNearBalanceUser = async (accountId, privateKey) => {
    const account = await AccountCall(accountId, privateKey);
    const Nearbalance = await account.getAccountBalance();
    return new BigNumber(Nearbalance.total).dividedBy(
        1e24
    );
};

const processAccount = async (accountId, privateKey) => {
    const mineAndUpdate = async () => {
        try {
            const detailUserResult = await getDetailUser(near, accountId);
            const NearBalanceUser = await getNearBalanceUser(accountId, privateKey);
            let miningEarnedMust = await miningEarned(detailUserResult);
            let miningProgressResult = miningProgress(detailUserResult);
            const hotPerHour = getHotPerHourInt(detailUserResult);
            if (parseFloat(miningProgressResult) >= parseFloat(miningEarnedMust)) {
                twisters.put(accountId, {
                    text: `
Account ID : ${accountId}
Near Balance : ${NearBalanceUser}
Hot In Storage : ${miningProgressResult}
Storage Full at ${miningEarnedMust}
Hot / Hour : ${hotPerHour}/hour 
Status : Claiming...
`,
                });

                const account = await AccountCall(accountId, privateKey);
                const callContract = await account.functionCall({
                    contractId: "game.hot.tg",
                    methodName: "claim",
                    args: {},
                });

                twisters.put(accountId, {
                    text: `
Account ID : ${accountId}
Near Balance : ${NearBalanceUser}
Hot In Storage : ${miningProgressResult}
Storage Full at ${miningEarnedMust}
Hot / Hour : ${hotPerHour}/hour 
Status : Claimed... ${callContract.transaction.hash}
`,
                });

                twisters.put(accountId, {
                    active: false,
                    removed: true,
                    text: `
Account ID : ${accountId}
Near Balance : ${NearBalanceUser}
Hot In Storage : ${miningProgressResult}
Storage Full at ${miningEarnedMust}
Hot / Hour : ${hotPerHour}/hour 
Status : Claimed... ${callContract.transaction.hash}
`,
                });

                await mineAndUpdate();
                return;
            }

            miningProgressResult = miningProgress(detailUserResult);
            twisters.put(accountId, {
                text: `
Account ID : ${accountId}
Near Balance : ${NearBalanceUser}
Hot In Storage : ${miningProgressResult}
Storage Full at ${miningEarnedMust}
Hot / Hour : ${hotPerHour}/hour 
Status : Mining
`,
            });

            setTimeout(mineAndUpdate, 500);
        } catch (error) {
            twisters.put(accountId, {
                active: false,
                text: `
Account ID : ${accountId}
Status : Error processing account, please check logs for details.
`,
            });

            twisters.put(accountId, {
                removed: true,
            });
            await mineAndUpdate();
            return;
        }
    }

    await mineAndUpdate();
    return;
};

const get_ProfileInfo = (publicKey) => new Promise((resolve, reject) => {

    fetch('https://api.nearblocks.io/v1/keys/' + publicKey, {
        method: 'GET',
        headers: {
            'authority': 'api.nearblocks.io',
            'accept': '*/*',
            'accept-language': 'id',
            'content-type': 'application/json',
            'network': 'mainnet',
            'origin': 'https://tgapp.herewallet.app',
            'platform': 'web',
            'referer': 'https://tgapp.herewallet.app',
            'sec-ch-ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'cors-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
        }
    })
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(err => reject(err))
});

const get_ProfileInfoByHereWallet = (publicKey) => new Promise((resolve, reject) => {

    fetch('https://api0.herewallet.app/api/v1/user/by_public_key?public_key='+publicKey, {
        headers: {
            'Accept': '*/*',
            'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
            'Connection': 'keep-alive',
            'Content-Type': 'application/json',
            'DeviceId': 'f921e598-1e21-4516-966c-101bbd93c827',
            'Network': 'mainnet',
            'Origin': 'https://my.herewallet.app',
            'Platform': 'web',
            'Referer': 'https://my.herewallet.app/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'Telegram-Data': 'undefined',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
            'sec-ch-ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"'
        }
    })
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(err => reject(err))
});

(async () => {
    const accountsData = fs
        .readFileSync("./accounts.txt", "utf-8")
        .split(/\r?\n/);
    const allPromise = [];
    const promises = accountsData.map(async (account) => {
        if (account) {
            const [privateKey] = account.split(/\r?\n/);

            const keyPair = KeyPair.fromString(privateKey);
            const publicKey = keyPair.getPublicKey().toString();

            
            const getAccountIdByHereWallet = await get_ProfileInfoByHereWallet(publicKey);
            let accountId = '';
            if (getAccountIdByHereWallet.users.length >= 1) {
                accountId = getAccountIdByHereWallet.users[0];
            }else{
                const get_accountId = await get_ProfileInfo(publicKey);
                if (get_accountId.keys.length >= 1) {
                    accountId = get_accountId.keys[0].account_id
                }
            }

            if (accountId) {
                processAccount(accountId, privateKey);
            }
            
        }

    });
    for (const processAccount of promises) {
        allPromise.push(await processAccount);
    }
})();
