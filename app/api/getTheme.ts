
export default function GetTheme() {
    if (typeof window !== 'undefined' && localStorage.getItem('theme')) {
        return localStorage.getItem('theme')
    } else return 'dark-scheme'
}