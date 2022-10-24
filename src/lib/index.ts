import { writable } from 'svelte-local-storage-store'
import { browser } from '$app/environment'
import { get } from 'svelte/store'

type Theme = 'light' | 'dark'

type Setting = Theme | 'sync'

type Store = {
	current: Theme
	setting: Setting
	isDark: boolean
	isLight: boolean
}

const initial: Store = {
	current: 'light',
	setting: 'sync',
	isDark: false,
	isLight: true
}

const isTheme = (x: string | undefined): x is Theme =>
	x === 'light' || x === 'dark'

const isSetting = (x: string): x is Setting => isTheme(x) || x === 'sync'

const bindClass = (tag: string, term: () => unknown) =>
	term()
		? document.body.classList.add(tag)
		: document.body.classList.remove(tag)

const systemSetting = (): Theme =>
	browser
		? matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light'
		: initial.current

const verdict = (setting?: Setting): Store => {
	const set = setting ?? get(internalStore).setting
	const sys = systemSetting()

	return isTheme(set)
		? {
				setting: set,
				current: set,
				isDark: set === 'dark',
				isLight: set === 'light'
		  }
		: {
				setting: 'sync',
				current: sys,
				isDark: sys === 'dark',
				isLight: sys === 'light'
		  }
}

const internalStore = writable<Store>(
	'svelte-dark-theme',
	verdict(initial.setting)
)

const { subscribe, set } = internalStore

internalStore.subscribe(x => {
	if (browser) {
		bindClass('dark', () => x.current === 'dark')
		bindClass('light', () => x.current === 'light')
	}
})

const setTheme = (setting?: Setting) => set(verdict(setting))

if (browser) {
	setTheme()
	matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () =>
		setTheme()
	)
}

export const theme = {
	subscribe,
	change: (setting: Setting) => (isSetting(setting) ? setTheme(setting) : null)
}
