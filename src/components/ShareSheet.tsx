import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { fetchMembers, fetchShareToken, leaveList, removeMember, rotateShareToken } from '../api/lists';
import { useT } from '../i18n';
import { Sheet } from './Sheet';
import styles from '../App.module.css';

type Props = {
  list: string;
  viewer: string;
  onClose: () => void;
  onLeft: () => void;
};

const inviteUrl = (token: string) => {
  const url = new URL(window.location.href);
  url.search = '';
  url.searchParams.set('join', token);
  return url.toString();
};

/**
 * Access panel. Sharing hands out an unguessable invite token rather than the
 * list's name, so knowing that someone is called "maria" no longer grants any
 * access to maria's list.
 */
export const ShareSheet = ({ list, viewer, onClose, onLeft }: Props) => {
  const { t } = useT();
  const owned = list === viewer;
  const [token, setToken] = useState<string | null>(null);
  const [members, setMembers] = useState<string[]>([]);

  const loadMembers = useCallback(async () => {
    try {
      const data = await fetchMembers(list);
      setMembers(data.members);
    } catch {
      setMembers([]);
    }
  }, [list]);

  useEffect(() => {
    if (!owned) return;
    fetchShareToken()
      .then((data) => setToken(data.token))
      .catch(() => setToken(null));
  }, [owned]);

  useEffect(() => {
    void loadMembers();
  }, [loadMembers]);

  const copyLink = async () => {
    if (!token) return;
    try {
      await navigator.clipboard.writeText(inviteUrl(token));
      toast.success(t('linkCopied'));
    } catch {
      toast.error(t('copyFailed'));
    }
  };

  const rotate = async () => {
    try {
      const data = await rotateShareToken();
      setToken(data.token);
      toast.success(t('linkRotated'));
    } catch {
      toast.error(t('somethingWrong'));
    }
  };

  const drop = async (member: string) => {
    try {
      await removeMember(list, member);
      setMembers((prev) => prev.filter((name) => name !== member));
      toast.success(t('memberRemoved', { member }));
    } catch {
      toast.error(t('somethingWrong'));
    }
  };

  const leave = async () => {
    try {
      await leaveList(list);
      toast.success(t('leftList', { list }));
      onLeft();
    } catch {
      toast.error(t('somethingWrong'));
    }
  };

  return (
    <Sheet title={t('shareTitle')} onClose={onClose}>
      {owned ? (
        <>
          <p className={styles.sheetHint}>{t('shareHint')}</p>
          <input
            className={styles.linkField}
            readOnly
            value={token ? inviteUrl(token) : '…'}
            onFocus={(e) => e.currentTarget.select()}
            aria-label={t('copyLink')}
          />
          <div className={styles.sheetActions}>
            <button type="button" onClick={copyLink} disabled={!token}>
              {t('copyLink')}
            </button>
            <button type="button" onClick={rotate} disabled={!token}>
              {t('rotateLink')}
            </button>
          </div>

          <h3 className={styles.sheetSubtitle}>{t('members')}</h3>
          {members.length === 0 ? (
            <p className={styles.sheetHint}>{t('noMembers')}</p>
          ) : (
            <ul className={styles.memberList}>
              {members.map((member) => (
                <li key={member}>
                  <span>{member}</span>
                  <button type="button" onClick={() => drop(member)}>
                    {t('removeMember')}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <>
          <p className={styles.sheetHint}>
            {t('activeList')}: <strong>{list}</strong>
          </p>
          <div className={styles.sheetActions}>
            <button type="button" className={styles.dangerButton} onClick={leave}>
              {t('leaveList')}
            </button>
          </div>
        </>
      )}
    </Sheet>
  );
};
