
const envMap = {
    development: "dev",
    production: "prod",
    test: "test"
};

const env = envMap[import.meta.env.MODE] || "dev";

console.log(env)

const EnvConfig = {
    dev: {
        baseApi: "",
        mockApi: ""
    },
    test: {
        baseApi: "",
        mockApi: ""
    },
    prod: {
        baseApi: "",
        mockApi: ""
    }
}

export default {
    baseApi: EnvConfig[env].baseApi,
    mockApi: EnvConfig[env].mockApi,
    env,
    mock: false
}