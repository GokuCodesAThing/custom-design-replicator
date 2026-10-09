<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Business contact details (phone, hours, map query) live in src/lib/site-config.ts; call/WhatsApp UI renders only when phone is set — never show unverified contact info.
- Enquiries are stored in the `enquiries` table (insert-only for anon); validation rules live in src/lib/enquiry.ts and are shared by the form and tests.
