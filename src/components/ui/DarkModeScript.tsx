// Inline script to prevent dark mode flash of unstyled content.
// Runs before React hydration to apply the dark class immediately.
// SAFE: The script content is a hardcoded string literal with no user input.
export function DarkModeScript() {
  const scriptContent = `(function(){try{if(localStorage.getItem('theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})()`;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: scriptContent }}
    />
  );
}
