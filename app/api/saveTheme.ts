
export type Theme = {
    theme: 'dark' | 'light' | 'system',
}

export default function SaveTheme(theme: Theme) {
    localStorage.setItem('theme', `${theme.theme}-scheme`)
}