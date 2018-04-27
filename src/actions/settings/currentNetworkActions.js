import { createActions } from 'spunky';
import { getStorage, setStorage } from '../../lib/storage';

export const ID = 'currentNetwork';
export const NETWORKS_ID = 'networks';

// Setters
export const setCurrentNetwork = createActions(ID, (currentNetwork) => async () => {
  await setStorage(ID, currentNetwork);
  return currentNetwork;
});

export const setNetworks = createActions(NETWORKS_ID, (networks) => async () => {
  await setStorage(NETWORKS_ID, networks);
  return networks;
});

export const addNetwork = createActions(NETWORKS_ID, (network) => async () => {
  const networks = await getStorage(NETWORKS_ID);
  const newNetworks = [...networks, network];
  await setStorage(NETWORKS_ID, newNetworks);
  return newNetworks;
});


export const clearNetworks = createActions(NETWORKS_ID, () => async () => {
  await setStorage(NETWORKS_ID, []);
  return [];
});

// Getters
export default createActions(ID, () => async () => {
  const currentNetwork = await getStorage(ID);
  if (!currentNetwork || !currentNetwork.neoscan) {
    return { name: 'TestNet', neoscan: 'TestNet' };
  }
  return currentNetwork;
});

export const getAllNetworks = createActions(NETWORKS_ID, () => async () => {
  const allNetworks = await getStorage(NETWORKS_ID);
  if (!allNetworks || !Array.isArray(allNetworks)) {
    return [];
  }
  return allNetworks;
});
