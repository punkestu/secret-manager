export function isUsed(processor) {
    return processor & 0b00000001;
}

export default function caesarStrategy(shift = 3) {
  return (data, dec = false) => {
    return dec
      ? atob(data)
          .split("")
          .map((char) => {
            const code = char.charCodeAt(0);
            if (code >= 65 && code <= 90) {
              return String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
            } else if (code >= 97 && code <= 122) {
              return String.fromCharCode(((code - 97 - shift + 26) % 26) + 97);
            } else {
              return char;
            }
          })
          .join("")
      : btoa(
          data
            .split("")
            .map((char) => {
              const code = char.charCodeAt(0);
              if (code >= 65 && code <= 90) {
                return String.fromCharCode(((code - 65 + shift) % 26) + 65);
              } else if (code >= 97 && code <= 122) {
                return String.fromCharCode(((code - 97 + shift) % 26) + 97);
              } else {
                return char;
              }
            })
            .join("")
        );
  };
}
