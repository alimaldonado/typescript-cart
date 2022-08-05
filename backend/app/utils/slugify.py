import re

non_url_safe = ['"', '#', '$', '%', '&', '+',
                ',', '/', ':', ';', '=', '?',
                '@', '[', '\\', ']', '^', '`',
                '{', '|', '}', '~', "'"]

# translate_table = {ord(char): u'' for char in non_url_safe}
non_url_safe_regex = re.compile(
    r'[{}]'.format(''.join(re.escape(x) for x in non_url_safe)))


def slugify(text):
    text = non_url_safe_regex.sub('', text).strip().lower()
    text = u'-'.join(re.split(r'\s+', text))
    return text
