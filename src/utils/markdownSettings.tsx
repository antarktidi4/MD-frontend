const markdownSettings = {
  h1: ({node, ...props}) => <h1 class="text-xl font-bold" {...props} />,
  h2: ({node, ...props}) => <h2 class="text-lg font-bold" {...props} />,
  h3: ({node, ...props}) => <h3 class="text-base font-bold" {...props} />,
  a: ({node, ...props}) => <a class="underline" {...props} />
};

export default markdownSettings;
