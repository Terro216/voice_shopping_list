-- A short free-text hint attached to an item: "тот, в красной пачке", "только
-- безлактозное". Dictation cannot express this reliably, and cramming it into
-- the name made the name useless for matching and for suggestion history.
ALTER TABLE items ADD COLUMN note TEXT;
