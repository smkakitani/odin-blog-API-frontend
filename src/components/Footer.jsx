// Styles

// Router
import { Link } from "react-router";



// 
export default function Footer() {
  const size = 40;

  return (
    <footer>
      <small>
        Copyright © 2026 
        <Link to="https://github.com/smkakitani/odin-blog-API-frontend" target="_blank">
          <img 
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" 
            height={size}
            width={size}
          />
        </Link>
      </small>
    </footer>
  );
}