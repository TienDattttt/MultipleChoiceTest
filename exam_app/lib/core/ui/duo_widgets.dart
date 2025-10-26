import 'package:flutter/material.dart';

/// Scaffold có AppBar với nút back mặc định
class DuoScaffold extends StatelessWidget {
  final String title;
  final String? subtitle;
  final Widget body;
  final List<Widget>? actions;
  final Widget? floating;

  const DuoScaffold({
    super.key,
    required this.title,
    this.subtitle,
    required this.body,
    this.actions,
    this.floating,
  });

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new),
          onPressed: () => Navigator.maybePop(context),
        ),
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title, style: const TextStyle(fontWeight: FontWeight.w800)),
            if (subtitle != null)
              Text(subtitle!,
                  style: TextStyle(fontSize: 12, color: cs.onSurfaceVariant)),
          ],
        ),
        actions: actions,
      ),
      body: body,
      floatingActionButton: floating,
    );
  }
}

/// Header gradient xanh kiểu Duolingo
class DuoHeader extends StatelessWidget {
  final String title;
  final String? subtitle;
  final Widget? trailing;
  const DuoHeader({super.key, required this.title, this.subtitle, this.trailing});

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return Container(
      padding: const EdgeInsets.fromLTRB(16, 24, 16, 16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [cs.primary, cs.primaryContainer],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: const BorderRadius.vertical(bottom: Radius.circular(28)),
      ),
      child: Row(
        children: [
          const Text('🦉', style: TextStyle(fontSize: 40)),
          const SizedBox(width: 12),
          Expanded(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text(title, style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w900, color: Colors.white)),
              if (subtitle != null)
                Text(subtitle!, style: TextStyle(color: Colors.white.withOpacity(.9))),
            ]),
          ),
          if (trailing != null) trailing!,
        ],
      ),
    );
  }
}

/// Nhãn section
class DuoSectionTitle extends StatelessWidget {
  final String text;
  final Widget? action;
  const DuoSectionTitle(this.text, {super.key, this.action});
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 14, 16, 8),
      child: Row(
        children: [
          Text(text, style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 16)),
          const Spacer(),
          if (action != null) action!,
        ],
      ),
    );
  }
}

/// Thẻ trắng bo góc
class DuoCard extends StatelessWidget {
  final Widget child;
  final EdgeInsets padding;
  const DuoCard({super.key, required this.child, this.padding = const EdgeInsets.all(16)});
  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      elevation: 0,
      child: Padding(padding: padding, child: child),
    );
  }
}

/// ListTile xinh gọn
class DuoListTile extends StatelessWidget {
  final IconData icon;
  final String title;
  final String? subtitle;
  final VoidCallback? onTap;
  final List<Widget>? trailing;
  const DuoListTile({super.key, required this.icon, required this.title, this.subtitle, this.onTap, this.trailing});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      child: ListTile(
        leading: CircleAvatar(child: Icon(icon)),
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.w700)),
        subtitle: subtitle != null ? Text(subtitle!) : null,
        trailing: trailing != null ? Wrap(spacing: 4, children: trailing!) : null,
        onTap: onTap,
      ),
    );
  }
}

/// Hiển thị rỗng
class DuoEmpty extends StatelessWidget {
  final String text;
  final String emoji;
  final Widget? action;
  const DuoEmpty({super.key, required this.text, this.emoji = '🫠', this.action});
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(mainAxisSize: MainAxisSize.min, children: [
          Text(emoji, style: const TextStyle(fontSize: 48)),
          const SizedBox(height: 8),
          Text(text, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
          if (action != null) ...[
            const SizedBox(height: 10),
            action!,
          ]
        ]),
      ),
    );
  }
}
